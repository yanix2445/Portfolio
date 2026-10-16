// Lighthouse CI, run on the Vercel preview of each pull request
// (.github/workflows/lighthouse.yml). Mobile settings, Lighthouse's default.
const previewUrl = process.env.PREVIEW_URL;
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

if (!previewUrl || !bypassSecret) {
  throw new Error(
    "PREVIEW_URL and VERCEL_AUTOMATION_BYPASS_SECRET are required to audit a protected preview",
  );
}

// Each threshold applies to the median of the runs, not to the best one.
const minScore = (score) => ["error", { minScore: score, aggregationMethod: "median" }];

module.exports = {
  ci: {
    collect: {
      url: [previewUrl],
      numberOfRuns: 3,
      settings: {
        extraHeaders: JSON.stringify({
          "x-vercel-protection-bypass": bypassSecret,
          "x-vercel-skip-toolbar": "1",
        }),
        // Not measurable on a protected preview, checked in production instead:
        // - is-crawlable: Vercel sends `x-robots-tag: noindex` on every preview.
        // - robots-txt: Lighthouse fetches /robots.txt outside the page, without
        //   the bypass header, so it reads the Vercel login page.
        skipAudits: ["is-crawlable", "robots-txt"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": minScore(0.95),
        "categories:accessibility": minScore(1),
        "categories:best-practices": minScore(1),
        "categories:seo": minScore(1),
      },
    },
  },
};
