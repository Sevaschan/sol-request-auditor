# Migration packet

Audit three planned GPT-6.1 Sol request profiles.

- account-search uses Chat Completions with a required function tool and high reasoning.
- policy-summary uses tool-free Chat Completions with minimal reasoning.
- case-analysis uses Responses with file search, 300,000 uncached input tokens, an unknown cache-write count, Fast processing and required EU residency.

The confirmed contract says tool calling requires Responses, minimal reasoning is unsupported, requests over 272,000 input tokens use long-context rates for the full request, and Fast mode is unavailable with EU residency.

Return a compatibility report without calling an API or changing configuration.
