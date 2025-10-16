import axios from "axios";
import * as cheerio from "cheerio";

export const frscVerify = async (plate) => {
  try {
    const url = "https://nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo";
    const response = await axios.post(url, `plateNo=${plate}`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const text = $("body").text().toLowerCase();

    if (text.includes("valid and assigned")) {
      return { status: "VALID", message: "Plate number valid and assigned (FRSC)" };
    } else if (text.includes("not found")) {
      return { status: "NOT FOUND", message: "Plate number not found in registry" };
    } else {
      return { status: "UNKNOWN", message: "Unable to confirm vehicle status" };
    }
  } catch (err) {
    console.error("FRSC check error:", err.message);
    return { status: "ERROR", message: "Failed to reach FRSC portal" };
  }
};
