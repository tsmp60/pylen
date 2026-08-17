import type { Exercise } from '../lib/pyodide'

export const exercises: Exercise[] = [
  {
    id: 1,
    title: 'First Print',
    unit: 'Python / Basics',
    objective: 'Print a friendly greeting to the terminal.',
    concept:
      "Use the print() function to display output. Python reads top-to-bottom, so each instruction runs in order.",
    story:
      'Your mentor arrives at the training bay and asks you to send the first signal back to the ship: a warm greeting.',
    task: [
      'Write a Python statement that prints a greeting.',
      'Keep the exact wording visible in the output panel.',
    ],
    requiredOutput: ['hello, pylen!'],
    starterCode: 'print("hello, pylen!")',
    hintLevels: [
      'Nudge: try using the print() function with a string inside quotes.',
      'Syntax pattern: print("text here")',
      'Solution: print("hello, pylen!")',
    ],
    xpReward: 25,
    assertions: [{ type: 'stdout', expected: 'hello, pylen!' }],
  },
  {
    id: 2,
    title: 'Variables',
    unit: 'Python / Basics',
    objective: 'Store a value in a variable and print it back.',
    concept:
      'Variables are named containers. The equals sign assigns a value, and print() lets you view the result.',
    story:
      'The training program needs to remember your quest score before it can unlock the next level.',
    task: [
      'Create a variable called score.',
      'Assign it the value 42 and print it.',
    ],
    requiredOutput: ['42'],
    starterCode: 'score = 42\nprint(score)',
    hintLevels: [
      'Nudge: assign a number to a variable name and then print the variable.',
      'Syntax pattern: score = 42\nprint(score)',
      'Solution: score = 42\nprint(score)',
    ],
    xpReward: 35,
    assertions: [
      { type: 'variable', name: 'score', expected: '42' },
      { type: 'stdout', expected: '42' },
    ],
  },
  {
    id: 3,
    title: 'String Builder',
    unit: 'Python / Basics',
    objective: 'Combine text using string formatting.',
    concept:
      'Strings are text, and Python lets you combine them with concatenation or f-strings to build readable messages.',
    story:
      'The system is asking for your agent tag. You need to craft a proper battle call before entering the next room.',
    task: [
      'Create a variable called agent_name.',
      'Build a message using the name and print it.',
    ],
    requiredOutput: ['agent_name', 'pylen agent'],
    starterCode: 'agent_name = "pylen"\nprint(f"agent: {agent_name}")',
    hintLevels: [
      'Nudge: use an f-string to insert the name into a message.',
      'Syntax pattern: print(f"agent: {agent_name}")',
      'Solution: agent_name = "pylen"\nprint(f"agent: {agent_name}")',
    ],
    xpReward: 45,
    assertions: [
      { type: 'variable', name: 'agent_name', expected: 'pylen' },
      { type: 'stdout', expected: 'agent: pylen' },
    ],
  },
  {
    id: 4,
    title: 'Math Quest',
    unit: 'Python / Basics',
    objective: 'Use arithmetic operators to calculate the total energy.',
    concept:
      'Python supports the same math you expect: addition, subtraction, multiplication, and division.',
    story:
      'Your battery reserves are low. Calculate the total energy needed to power the next quest and keep the mission alive.',
    task: [
      'Create variables for base and bonus energy.',
      'Calculate and print the total.',
    ],
    requiredOutput: ['120'],
    starterCode: 'base = 80\nbonus = 40\nprint(base + bonus)',
    hintLevels: [
      'Nudge: add the two variables together and print the result.',
      'Syntax pattern: print(base + bonus)',
      'Solution: base = 80\nbonus = 40\nprint(base + bonus)',
    ],
    xpReward: 55,
    assertions: [
      { type: 'variable', name: 'base', expected: '80' },
      { type: 'variable', name: 'bonus', expected: '40' },
      { type: 'stdout', expected: '120' },
    ],
  },
  {
    id: 5,
    title: 'Conditional Check',
    unit: 'Python / Basics',
    objective: 'Use an if statement to make a decision.',
    concept:
      'Conditionals check whether a statement is true. They allow your program to branch and respond differently to inputs.',
    story:
      'The gate guard only opens the path if your level is high enough. Confirm access with a condition.',
    task: [
      'Set level to 11.',
      'Print Access granted if the level is at least 10.',
    ],
    requiredOutput: ['Access granted'],
    starterCode: 'level = 11\nif level >= 10:\n    print("Access granted")',
    hintLevels: [
      'Nudge: check whether level is greater than or equal to 10.',
      'Syntax pattern: if level >= 10:\n    print("Access granted")',
      'Solution: level = 11\nif level >= 10:\n    print("Access granted")',
    ],
    xpReward: 65,
    assertions: [
      { type: 'variable', name: 'level', expected: '11' },
      { type: 'stdout', expected: 'Access granted' },
    ],
  },
]
