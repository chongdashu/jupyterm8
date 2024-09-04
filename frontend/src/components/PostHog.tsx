import posthog from "posthog-js";
import { useEffect } from "react";

export default function PostHog() {
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY as string, {
        api_host: "https://eu.i.posthog.com",
        person_profiles: "identified_only",
        // Disable in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development")
            posthog.opt_out_capturing();
        },
      });
    }
  }, []);

  return null; // This component doesn't render anything
}
