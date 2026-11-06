/**
 * LLADIGA Website Structured Data
 * Designed for easy multi-year maintenance across the 3-year grant.
 *
 * NOTE ON DOUBLE-BLIND SUBMISSIONS:
 * Keep active anonymous submissions (e.g., ACL/EMNLP under review) out of the
 * public `PUBLICATIONS` array below until camera-ready notification.
 */

window.LLADIGA_DATA = {
  games: {
    taboo: {
      id: "taboo",
      name: "Taboo",
      family: "Verbal · Pragmatic Constraints",
      contextLeft: "Target Word: <code>TELESCOPE</code>",
      contextRight: "Taboo Words: <code>star, space, lens, look, sky</code>",
      competencies: [
        "Lexical Inhibition",
        "Pragmatic Reformulation",
        "Listener Modeling",
        "Rule Compliance"
      ],
      learningSignal:
        "Game Master enforces strict lexical constraints at every turn while rewarding concise, successful communicative grounding.",
      turns: [
        {
          role: "gm",
          speaker: "Game Master · Episode Init",
          text: "P1 must guide P2 to guess the target concept without uttering any forbidden root words. Max 3 turns.",
          turnNum: "0/3",
          violations: "0",
          status: "In Progress",
          reward: "0.00"
        },
        {
          role: "p1",
          speaker: "Player 1 (Clue-Giver)",
          text: "CLUE: Galileo improved this tubular optical instrument to observe distant moons and planets from Earth.",
          turnNum: "1/3",
          violations: "0",
          status: "Valid Clue",
          reward: "+0.15 (rule-compliant)"
        },
        {
          role: "p2",
          speaker: "Player 2 (Guesser)",
          text: "GUESS: binoculars",
          turnNum: "1/3",
          violations: "0",
          status: "Continue",
          reward: "+0.00 (refining)"
        },
        {
          role: "p1",
          speaker: "Player 1 (Clue-Giver · Adapts)",
          text: "CLUE: Close, but used by astronomers in observatories—for one eye or giant mirrors, like Hubble.",
          turnNum: "2/3",
          violations: "0",
          status: "Pragmatic Repair",
          reward: "+0.25 (belief update)"
        },
        {
          role: "p2",
          speaker: "Player 2 (Guesser)",
          text: "GUESS: telescope",
          turnNum: "2/3",
          violations: "0",
          status: "Goal Reached ✓",
          reward: "+1.00 (clemscore: 83.3)"
        }
      ]
    },

    grid: {
      id: "grid",
      name: "Image Grid Reconstruction",
      family: "Visuospatial · Grounded Coordination",
      contextLeft: "Grid Size: <code>5 × 5 ASCII</code>",
      contextRight: "Asymmetric View: <code>P1 sees target · P2 starts blank</code>",
      competencies: [
        "Spatial Mental Models",
        "Referential Grounding",
        "Turn-by-Turn Planning",
        "Instruction Following"
      ],
      learningSignal:
        "Dense spatial F1 / grid-match feedback measures whether P1's referring expressions induce accurate state updates in P2.",
      turns: [
        {
          role: "gm",
          speaker: "Game Master · Episode Init",
          text: "P1 inspects a target 5×5 symbol grid and instructs P2 step-by-step to reconstruct an identical layout.",
          turnNum: "0/3",
          violations: "0",
          status: "In Progress",
          reward: "Grid F1: 0.00"
        },
        {
          role: "p1",
          speaker: "Player 1 (Director)",
          text: "INSTRUCTION: Fill the entire top row (row 1, columns 1 to 5) with 'X'. Leave everything else blank.",
          turnNum: "1/3",
          violations: "0",
          status: "Parsed Validly",
          reward: "Grid F1: 0.56"
        },
        {
          role: "p2",
          speaker: "Player 2 (Builder)",
          text: "Updated canvas state:",
          pre: "X X X X X\n. . . . .\n. . . . .\n. . . . .\n. . . . .",
          turnNum: "1/3",
          violations: "0",
          status: "Aligned",
          reward: "Grid F1: 0.56"
        },
        {
          role: "p1",
          speaker: "Player 1 (Director)",
          text: "INSTRUCTION: Great. Now place 'X' straight down the middle column (column 3, rows 2 through 5) to form a T-shape.",
          turnNum: "2/3",
          violations: "0",
          status: "Compositional",
          reward: "Grid F1: 1.00"
        },
        {
          role: "p2",
          speaker: "Player 2 (Builder)",
          text: "Updated canvas state (100% match):",
          pre: "X X X X X\n. . X . .\n. . X . .\n. . X . .\n. . X . .",
          turnNum: "2/3",
          violations: "0",
          status: "Exact Match ✓",
          reward: "+1.00 (clemscore: 100)"
        }
      ]
    },

    guesswhat: {
      id: "guesswhat",
      name: "GuessWhat? Dialogue",
      family: "Information-Seeking · Strategic Inquiry",
      contextLeft: "Candidate Pool: <code>8 Concepts</code>",
      contextRight: "Oracle Constraint: <code>Yes / No replies only</code>",
      competencies: [
        "Hypothesis Space Pruning",
        "Information Gain Maximization",
        "Multi-Turn Memory",
        "Deductive Stopping"
      ],
      learningSignal:
        "Rewards active questions that bisect candidate uncertainty rather than naive one-by-one enumeration.",
      turns: [
        {
          role: "gm",
          speaker: "Game Master · Candidate Set",
          text: "Candidates: {sparrow, penguin, dolphin, oak, bicycle, violin, glacier, lantern}. Hidden target: PENGUIN.",
          turnNum: "0/4",
          violations: "0",
          status: "8 Candidates",
          reward: "Entropy: 3.0 bits"
        },
        {
          role: "p1",
          speaker: "Player 1 (Questioner)",
          text: "QUESTION: Is it a living organism?",
          turnNum: "1/4",
          violations: "0",
          status: "4 Left",
          reward: "Entropy: 2.0 bits"
        },
        {
          role: "p2",
          speaker: "Player 2 (Oracle)",
          text: "ANSWER: yes.",
          turnNum: "1/4",
          violations: "0",
          status: "4 Left",
          reward: "+0.33 info gain"
        },
        {
          role: "p1",
          speaker: "Player 1 (Questioner)",
          text: "QUESTION: Does it have feathers, and is it flightless?",
          turnNum: "2/4",
          violations: "0",
          status: "1 Left",
          reward: "Entropy: 0.0 bits"
        },
        {
          role: "p2",
          speaker: "Player 2 (Oracle) → P1 Final Guess",
          text: "Oracle: yes.  →  P1 GUESS: penguin",
          turnNum: "3/4",
          violations: "0",
          status: "Solved Optimally ✓",
          reward: "+1.00 (optimal log₂N)"
        }
      ]
    }
  }
};
