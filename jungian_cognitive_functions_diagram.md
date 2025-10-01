# Jungian Cognitive Functions as an Information Processing System

This document contains a sequence diagram that models the Jungian cognitive functions of an INTP personality type as they process information to solve a logical puzzle.

## Sequence Diagram (Mermaid.js)

You can view this diagram by pasting the code block below into a Mermaid.js-compatible renderer, such as the one provided by GitHub, GitLab, or online editors like [mermaid.live](https://mermaid.live).

```mermaid
sequenceDiagram
    autonumber
    participant ExternalWorld as "External World"
    participant Ne as "Ne (Auxiliary)"
    participant Ti as "Ti (Dominant)"
    participant Si as "Si (Tertiary)"
    participant Fe as "Fe (Inferior)"

    ExternalWorld->>+Ne: Presents new logical puzzle
    Note right of Ne: Ne scans for possibilities, patterns,<br/>and abstract connections.
    Ne-->>-Ti: Here are the potential patterns.

    activate Ti
    Note left of Ti: Ti begins deep, logical analysis<br/>to build an internal model.
    Ti->>Ti: Analyze patterns for internal consistency.

    Ti->>+Si: Recall similar problems or principles.
    Note right of Si: Si provides detailed, stored<br/>sensory data and past experiences.
    Si-->>-Ti: Here's what worked before.

    Ti->>Ti: Synthesize new and past data<br/>to form a complete solution.

    Note over Ti,Fe: The solution is checked against the inferior function.
    Ti->>+Fe: How might this solution impact others?
    Note left of Fe: Fe provides a basic, often<br/>underdeveloped, check for social harmony.
    Fe-->>-Ti: The logic is sound, but be mindful of delivery.

    deactivate Ti

    Ti->>ExternalWorld: Here is the logically-derived solution.
```
