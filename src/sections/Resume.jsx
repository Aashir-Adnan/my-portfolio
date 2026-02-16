import { useState, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";

const RESUME_PDF = "/resume.pdf";
const RESUME_TXT = "/resume.txt";
const RESUME_TEX = "/resume.tex";

const Resume = () => {
  const [mode, setMode] = useState(null); // "pdf" | "text"
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const tryPdf = () =>
      fetch(RESUME_PDF, { method: "HEAD" })
        .then((res) => (res.ok ? "pdf" : null))
        .catch(() => null);

    const tryText = (url) =>
      fetch(url)
        .then((res) => (res.ok ? res.text() : Promise.reject(new Error("Not found"))))
        .then((text) => ({ mode: "text", text }));

    tryPdf()
      .then((pdfOk) => {
        if (cancelled) return;
        if (pdfOk === "pdf") {
          setMode("pdf");
          setLoading(false);
          return;
        }
        return tryText(RESUME_TXT)
          .catch(() => tryText(RESUME_TEX))
          .then((result) => {
            if (cancelled) return;
            setMode("text");
            setContent(result.text);
          })
          .catch(() => {
            if (!cancelled) setError("No resume file found.");
          });
      })
      .catch(() => {
        if (!cancelled) setError("No resume file found.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <section id="resume" className="flex-center section-padding">
        <div className="w-full max-w-4xl md:px-10 px-5 z-[1]">
          <TitleHeader title="Resume" sub="Loading…" />
          <div className="mt-10 card-border rounded-xl p-8 min-h-[24rem] flex items-center justify-center">
            <p className="text-white-50 animate-pulse">Loading resume…</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="resume" className="flex-center section-padding">
        <div className="w-full max-w-4xl md:px-10 px-5 z-[1]">
          <TitleHeader title="Resume" sub="Add a file to display" />
          <div className="mt-10 card-border rounded-xl p-6">
            <p className="text-red-400 mb-2">{error}</p>
            <p className="text-white-50 text-sm">
              Add one of these to the <code className="bg-black-200 px-1 rounded">public</code> folder:
            </p>
            <ul className="list-disc list-inside text-white-50 text-sm mt-2 space-y-1">
              <li><code>resume.pdf</code> – displayed in browser (easiest)</li>
              <li><code>resume.txt</code> – plain text, no processing</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "pdf") {
    return (
      <section id="resume" className="flex-center section-padding">
        <div className="w-full max-w-4xl md:px-10 px-5 z-[1]">
          <TitleHeader
            title="Resume"
            sub="PDF – open in new tab if needed"
          />
          <div className="mt-10 card-border rounded-xl overflow-hidden min-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-black-200 border-b border-black-50">
              <span className="text-white-50 text-sm font-mono">resume.pdf</span>
              <a
                href={RESUME_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-purple-600/80 hover:bg-purple-600 text-white text-sm transition"
              >
                Open in new tab
              </a>
            </div>
            <div className="flex-1 min-h-[60vh] bg-gray-900">
              <iframe
                src={`${RESUME_PDF}#toolbar=0`}
                title="Resume PDF"
                className="w-full h-full min-h-[60vh] border-0"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="flex-center section-padding">
      <div className="w-full max-w-4xl md:px-10 px-5 z-[1]">
        <TitleHeader
          title="Resume"
          sub="Plain text – no processing"
        />
        <div className="mt-10 card-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-black-200 border-b border-black-50">
            <span className="text-white-50 text-sm font-mono">resume.txt</span>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!content}
              className="px-3 py-1.5 rounded bg-purple-600/80 hover:bg-purple-600 text-white text-sm transition disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="p-4 md:p-6 min-h-[200px] max-h-[70vh] overflow-auto">
            <pre className="text-white-50 text-sm md:text-base font-mono whitespace-pre-wrap break-words">
              <code>{content}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
