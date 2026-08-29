// Failure patterns only. No live exploits, no CVEs, no payloads, no targets.
// Each one is written from the builder's side: here is the shape of the hole,
// and here is why the defense you already bought does not see it.
//
// `published` is the date the piece went up on this site (git history).
// `found` ties the pattern to a published engagement case and must reuse the
// wording already shipped in data/engagements.ts. The voice piece has no
// published engagement behind it yet, so it carries no line. Do not write one
// for it until there is a case on the record.
export interface Piece {
  slug: string
  code: string
  klass: string
  published: string
  byline: string
  title: string
  hook: string
  found?: string
  body: string[]
}

export const pieces: Piece[] = [
  {
    slug: 'agent-authorization',
    code: 'API1',
    klass: 'authorization',
    published: '2026-07-30',
    byline: 'Bao · Adversarial research',
    title: 'The agent checked who you are, then never checked what you asked for',
    hook: 'Your session auth is probably fine. The object your agent fetched on your behalf is the part nobody guarded.',
    found:
      "We found this shape in a Fortune 500 customer-experience platform. A canary account owning no data listed more than two thousand other tenants' live support conversations.",
    body: [
      'Almost every agent gets built with the session boundary correct. You log in, the request carries your identity, and the framework enforces it. Then the agent is given a tool that takes an identifier, a conversation, a ticket, an order, a record, and the tool goes and gets it.',
      'The identifier is where it fails. The tool trusts that whatever the model passed it was something the caller was entitled to, because the caller was authenticated. Authenticated and authorized get collapsed into one check, and the second one quietly never happens.',
      'What makes it hard to see in review is that the model is doing exactly what it was asked. There is no injection, no jailbreak, no clever prompt. A user asks about their order, the agent asks about a different order, and the backend answers because the session was valid.',
      'Standard defenses miss it because they are watching the language. A guardrail scoring the prompt for hostility sees a polite customer question. A WAF sees an authenticated API call in the normal shape. The failure is one layer under the thing being monitored.',
      'The check to run: for every tool your agent can call, ask whether the ownership of the argument is verified at the point the data is read, not at the point the user logged in. If the answer involves the word "should", it is not verified.',
    ],
  },
  {
    slug: 'allowlist-environment',
    code: 'LLM08',
    klass: 'tool layer',
    published: '2026-07-30',
    byline: 'Bao · Adversarial research',
    title: 'The allowlist was trusted. The ground it ran on was not',
    hook: 'You constrained which commands the agent may run. You did not constrain the environment those commands resolve in.',
    found:
      "We found this shape in a coding agent's tool connector. Its author-trust filter shipped off by default, so text from a stranger's pull request reached the agent as trusted instructions.",
    body: [
      'The standard containment for a tool-using agent is an allowlist. These commands are safe, everything else is refused. It is a reasonable model and it holds right up until the thing being allowlisted is a name rather than a behaviour.',
      'A command name resolves through an environment. Configuration files, path lookup, aliases, project-local settings, plugin manifests, hook definitions. If any of that is writable by content the agent ingests, then an allowlisted name can be pointed at something else entirely, and the allowlist still passes because the name did not change.',
      "This is the shape behind a whole family of recent agent escapes, and it generalises well past coding tools. Anywhere an agent reads a workspace it did not author, the workspace gets a vote on what the agent's own commands mean.",
      'The reason it survives review is that the allowlist looks like the control. It is auditable, it is short, and reading it gives real comfort. The mutable part is the environment, which is rarely in the same document.',
      'The check to run: take your allowlist, and for each entry ask what would have to be true for that name to resolve to different behaviour. Then ask whether any content the agent reads can make that true.',
    ],
  },
  {
    slug: 'voice-identity',
    code: 'ASI04',
    klass: 'identity',
    published: '2026-07-30',
    byline: 'Bao · Adversarial research',
    title: 'Identified is not verified, and voice agents keep confusing the two',
    hook: 'The caller told your agent who they were. Your agent believed them, and then acted on it.',
    body: [
      'A voice or chat agent handling accounts has to establish who it is talking to. Almost all of them do the first half well: they collect a name, an account reference, a date of birth, and they route on it. Very few do the second half, which is proving that the person supplying those details is the person they describe.',
      'The details are usually not secret. A name and an account number are semi-public, and the rest is frequently derivable. Once the agent treats the claim as established, everything downstream inherits the mistake, including the tools that write.',
      'The tell is in the transcript rather than the code. The agent moves from asking to assuming in a single turn, and after that it never re-establishes identity even when the request escalates from reading something harmless to changing something that matters.',
      'Guardrails do not catch this because nothing hostile is said. The conversation is cooperative from end to end. It is a business logic failure wearing the clothes of a normal support call.',
      'The check to run: read a transcript and mark the exact turn where your agent stops verifying and starts assuming. Then list every tool it can reach after that turn. That list is your actual blast radius.',
    ],
  },
]
