
import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config({ path: "server/.env" });

const app = express();
const PORT = Number(process.env.PORT || 5001);

// Middleware
app.use(express.json({ limit: "20kb" }));

app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  })
);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Felixa Vistas backend is running.",
  });
});

// Site visit enquiry
app.post("/api/site-visit", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      buyingTimeline,
      visitTimeline,
      consent,
    } = req.body || {};

    // Validate form fields
    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name.",
      });
    }

    if (
      typeof phone !== "string" ||
      !/^\+?[0-9 ()-]{10,16}$/.test(phone.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid mobile number.",
      });
    }

    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (
      typeof buyingTimeline !== "string" ||
      !buyingTimeline.trim() ||
      typeof visitTimeline !== "string" ||
      !visitTimeline.trim() ||
      consent !== true
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields and consent.",
      });
    }

    // Read credentials from server/.env
    const apiKey = process.env.SELLDO_API_KEY;
    const srd = process.env.SELLDO_SRD;

    if (!apiKey || !srd) {
      console.error("Sell.Do configuration is missing.");

      return res.status(500).json({
        success: false,
        message: "CRM configuration is missing.",
      });
    }

    // Prepare Sell.Do legacy API parameters
    const params = new URLSearchParams({
      api_key: apiKey,
      "sell_do[form][lead][name]": name.trim(),
      "sell_do[form][lead][email]": email.trim(),
      "sell_do[form][lead][phone]": phone.trim(),
      "sell_do[form][note][content]": [
        "Website Lead - Felixa Vistas",
        `Buying timeline: ${buyingTimeline.trim()}`,
        `Site visit timeline: ${visitTimeline.trim()}`,
        "Consent: Yes",
      ].join("\n"),
      "sell_do[campaign][srd]": srd,
    });

    // Send enquiry to Sell.Do
    const crmResponse = await fetch(
      `https://app.sell.do/api/leads/create?${params.toString()}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(15000),
      }
    );

    // Read response body once
    const responseText = await crmResponse.text();

    let crmData;

    try {
      crmData = JSON.parse(responseText);
    } catch {
      crmData = null;
    }

    // Never log the request URL: it contains the API key and lead details.
    console.log("Sell.Do HTTP status:", crmResponse.status);

    if (!crmResponse.ok || !crmData) {
      console.error(
        "Sell.Do returned an HTTP error or an unreadable response."
      );

      return res.status(502).json({
        success: false,
        message: "Unable to confirm the enquiry with Sell.Do.",
      });
    }

    // Log only non-sensitive diagnostic information.
    console.log("Sell.Do lead ID:", crmData.sell_do_lead_id || "Not provided");
    console.log(
      "Sell.Do verified:",
      crmData.sell_do_lead_verified ?? "Not provided"
    );
    console.log(
      "Sell.Do duplicate flag:",
      crmData.selldo_lead_details?.lead_already_exists ?? "Not provided"
    );

    // Sell.Do may return an error array alongside a saved lead ID.
    // A returned lead ID confirms the API reports a saved lead, but not
    // necessarily that it is verified or that a new record was created.
    const leadId = crmData.sell_do_lead_id;
    const leadSaved = Boolean(leadId);

    const duplicateLead =
      crmData.selldo_lead_details?.lead_already_exists === true;

    const errorMessages = Array.isArray(crmData.error)
      ? crmData.error
      : crmData.error
        ? [String(crmData.error)]
        : [];

    if (leadSaved) {
      return res.status(200).json({
        success: true,
        duplicate: duplicateLead,
        leadId,
        verified: crmData.sell_do_lead_verified === true ||
          crmData.sell_do_lead_verified === "true",
        message: duplicateLead
          ? "Your enquiry has been received. Your contact details already exist in our CRM."
          : "Thank you! Your enquiry has been submitted successfully.",
      });
    }

    // No lead ID was returned, so don't report success.
    console.error(
      "Sell.Do did not return a lead ID.",
      errorMessages.length ? `Error count: ${errorMessages.length}` : ""
    );

    return res.status(502).json({
      success: false,
      message: "Sell.Do could not confirm that your enquiry was saved.",
    });
  } catch (error) {
    console.error("Site visit API error:", error?.name || "UnknownError");

    return res.status(500).json({
      success: false,
      message:
        error?.name === "TimeoutError"
          ? "The CRM request timed out. Check Sell.Do before submitting again."
          : "Unable to process your enquiry right now.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Felixa Vistas backend running at http://localhost:${PORT}`);
});
