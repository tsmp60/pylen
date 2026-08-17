# Pylen Curriculum: Python / Basics → Advanced

---

# Unit 1: First Steps

## Exercise 1.1: Say Hello
- **Type:** LESSON
- **Learn:** `print()` is how Python talks to the world. Anything inside the parentheses in quotes gets shown on screen exactly as written.
```python
print("I am a wizard!")
```
- **Instructions:** Write a program using `print()` that outputs a greeting message with the text `Hello, Pylen!`
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Hello, Pylen!
- **Starter Code:**
```python
# Write your code below
```

## Exercise 1.2: Comments Are Sticky Notes
- **Type:** LESSON
- **Learn:** A `#` turns a line into a comment — a note for humans that Python ignores. Great for leaving yourself reminders.
```python
# This line does nothing
print("But this one does!")
```
- **Instructions:** Print `Comments are ignored` and add a comment above it explaining what the code does.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Comments are ignored
- **Starter Code:**
```python
# Write your code below
```

## Exercise 1.3: Multiple Print Lines
- **Type:** LESSON
- **Learn:** Each `print()` call starts a fresh new line, like pressing Enter on a keyboard.
```python
print("Line one")
print("Line two")
```
- **Instructions:** Print three separate lines: `Python`, `is`, `fun` (one word per line).
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Python
is
fun
- **Starter Code:**
```python
# Write your code below
```

## Exercise 1.4: BOSS CHALLENGE — ASCII Nameplate
- **Type:** BOSS_CHALLENGE
- **Learn:** Combine repeated `print()` calls to build a tiny piece of "art" — this is how real developers create splash screens and CLI banners.
- **Instructions:** Build a 3-line nameplate for Pylen using only `print()`. Line 1: `*********`, Line 2: `* PYLEN *`, Line 3: `*********`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** *********
* PYLEN *
*********
- **Starter Code:**
```python
# Write your code below
```

---

# Unit 2: Variable Vaults

## Exercise 2.1: Labeled Toy Boxes
- **Type:** LESSON
- **Learn:** A variable is a labeled box that stores a value so you can reuse it later. No quotes needed for the label, just the name.
```python
hero_name = "Zara"
print(hero_name)
```
- **Instructions:** Create a variable `city` set to `"Pylen City"` and print it.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Pylen City
- **Starter Code:**
```python
# Write your code below
```

## Exercise 2.2: Refilling the Box (Reassignment)
- **Type:** LESSON
- **Learn:** Variables aren't locked — you can pour a new value into the same box any time by assigning to it again.
```python
coins = 10
coins = 25
print(coins)
```
- **Instructions:** Set `hp = 50`, then reassign `hp = 80`, then print `hp`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 80
- **Starter Code:**
```python
# Write your code below
```

## Exercise 2.3: Combining Boxes (f-strings)
- **Type:** LESSON
- **Learn:** f-strings let you drop variables straight into text using curly braces `{}`. Put an `f` right before the opening quote.
```python
name = "Zara"
print(f"Welcome, {name}!")
```
- **Instructions:** Create `player = "Nova"` and `level = 5`, then print `Player Nova is on level 5` using an f-string.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Nova
- **Starter Code:**
```python
# Write your code below
```

## Exercise 2.4: BOSS CHALLENGE — Character Sheet Generator
- **Type:** BOSS_CHALLENGE
- **Learn:** Real programs mix many variables and types together, then format them into readable output — exactly like a game character sheet.
- **Instructions:** Create variables `name = "Ace"`, `hp = 100`, `is_alive = True`. Print a line containing all three values (e.g. `Ace | HP: 100 | Alive: True`).
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Ace
- **Starter Code:**
```python
# Write your code below
```

---

# Unit 3: Interactive Inputs

## Exercise 3.1: Asking the Player a Question
- **Type:** LESSON
- **Learn:** `input()` pauses your program and waits for the player to type something. Whatever they type comes back as a string (text), even if it looks like a number.
```python
name = input("What's your name? ")
print(f"Hello, {name}!")
```
- **Instructions:** Ask the user for their name with `input("What's your name? ")`, store it in `name`, then print `Hello, {name}!`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Hello
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "Nova"
```

## Exercise 3.2: Turning Text Into Numbers
- **Type:** LESSON
- **Learn:** `input()` always gives text, so wrap it in `int()` or `float()` to do math with it. `int(input())` reads a whole number, `float(input())` reads a decimal.
```python
age = int(input("How old are you? "))
print(age + 1)
```
- **Instructions:** Ask `"Enter your age: "` with `int(input(...))`, store it as `age`, then print how old the user will be next year (`age + 1`).
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** next
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "25"
```

## Exercise 3.3: Celsius to Fahrenheit Converter
- **Type:** LESSON
- **Learn:** Real-world unit converters combine `float(input())` with a formula. Fahrenheit = Celsius × 9/5 + 32.
```python
celsius = float(input("Enter temp in C: "))
fahrenheit = celsius * 9/5 + 32
print(fahrenheit)
```
- **Instructions:** Ask the user for a Celsius temperature using `float(input("Enter temp in Celsius: "))`, convert it to Fahrenheit using `°C * 9/5 + 32`, and print the result.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 98.6
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "37"
```

## Exercise 3.4: BOSS CHALLENGE — Age in Days Calculator
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining `int(input())` with a small formula turns a single question into a genuinely useful little tool — this is how real "calculator" utilities are built.
- **Instructions:** Ask the user for their age in years using `int(input("Enter your age in years: "))`, then calculate and print roughly how many days old they are (`age * 365`).
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** 365
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "20"
```

---

# Unit 4: Math & Operators

## Exercise 4.1: Basic Arithmetic
- **Type:** LESSON
- **Learn:** Python does math with `+ - * /`. Division `/` always gives a decimal (float), even if it divides evenly.
```python
print(10 + 5)
print(10 / 3)
```
- **Instructions:** Print the result of `48 + 12`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 60
- **Starter Code:**
```python
# Write your code below
```

## Exercise 4.2: Whole Number Tricks
- **Type:** LESSON
- **Learn:** `//` (floor division) drops the decimal, and `%` (modulo) gives you the leftover remainder — perfect for checking odd/even.
```python
print(17 // 5)  # 3
print(17 % 5)   # 2
```
- **Instructions:** Print the remainder when `29` is divided by `4` using `%`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 1
- **Starter Code:**
```python
# Write your code below
```

## Exercise 4.3: Powers & Order of Operations
- **Type:** LESSON
- **Learn:** Python follows math's PEMDAS rules. Use parentheses `()` to force your own order, and `**` for exponents (powers).
```python
print(2 + 3 * 4)     # 14
print(2 ** 3)         # 8
```
- **Instructions:** Print the result of `(5 + 3) ** 2`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 64
- **Starter Code:**
```python
# Write your code below
```

## Exercise 4.4: BOSS CHALLENGE — Change Machine
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining `//` and `%` is a classic real-world trick: breaking a big number into chunks (like coins) is exactly how vending machines calculate change.
- **Instructions:** A vending machine owes `87` cents in change. Using only quarters (25 cents), print `{quarters} quarters` (whole quarters given out via `//`), then on the next line print `{remainder} cents left` (the leftover via `%`).
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** 3 quarters
12 cents left
- **Starter Code:**
```python
# Write your code below
cents = 87
```

---

# Unit 5: Decision Time

## Exercise 5.1: True or False
- **Type:** LESSON
- **Learn:** Comparisons like `==`, `>`, `<` produce a `bool`: `True` or `False`. These are the questions your code can ask.
```python
print(5 > 3)
print(5 == 5)
```
- **Instructions:** Print the result of `10 != 10`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** False
- **Starter Code:**
```python
# Write your code below
```

## Exercise 5.2: If This, Then That
- **Type:** LESSON
- **Learn:** An `if` statement runs code only when its condition is `True`. Indentation (4 spaces) tells Python what belongs inside.
```python
age = 15
if age >= 13:
    print("Teenager")
```
- **Instructions:** Set `score = 85`. If `score` is greater than or equal to `60`, print `Pass`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Pass
- **Starter Code:**
```python
# Write your code below
score = 85
```

## Exercise 5.3: Otherwise... (else)
- **Type:** LESSON
- **Learn:** `else` catches everything an `if` didn't. Together they cover both outcomes of a single question.
```python
temp = 15
if temp > 20:
    print("Warm")
else:
    print("Cold")
```
- **Instructions:** Set `hp = 0`. If `hp > 0` print `Alive`, else print `Defeated`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Defeated
- **Starter Code:**
```python
# Write your code below
hp = 0
```

## Exercise 5.4: BOSS CHALLENGE — Ticket Price Checker
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining `int(input())` from Unit 3 with `if`/`else` logic is exactly how real ticket-pricing and eligibility systems work.
- **Instructions:** Ask for age using `int(input("Enter your age: "))`. If age is under `13`, print `Child ticket`. Else print `Adult ticket`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** ticket
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "10"
```

---

# Unit 6: Smart Conditions

## Exercise 6.1: The Middle Option (elif)
- **Type:** LESSON
- **Learn:** `elif` checks another condition if the first was False. Python checks conditions top to bottom and stops at the first match.
```python
temp = 30
if temp > 35:
    print("Hot")
elif temp > 20:
    print("Warm")
else:
    print("Cold")
```
- **Instructions:** Set `grade = 75`. If `grade >= 90` print `A`, elif `grade >= 70` print `B`, else print `C`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** B
- **Starter Code:**
```python
# Write your code below
grade = 75
```

## Exercise 6.2: Needing Both (and)
- **Type:** LESSON
- **Learn:** `and` combines two conditions — the whole thing is only `True` if both sides are `True`.
```python
age = 20
has_id = True
if age >= 18 and has_id:
    print("Entry allowed")
```
- **Instructions:** Set `hp = 50` and `has_potion = True`. If `hp > 0 and has_potion`, print `Can fight`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Can fight
- **Starter Code:**
```python
# Write your code below
hp = 50
has_potion = True
```

## Exercise 6.3: Needing Either (or) and Flipping (not)
- **Type:** LESSON
- **Learn:** `or` is True if at least one side is True. `not` flips a bool from True to False (or back).
```python
is_weekend = True
is_holiday = False
if is_weekend or is_holiday:
    print("No school!")
```
- **Instructions:** Set `is_raining = False`. If `not is_raining`, print `Go outside`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Go outside
- **Starter Code:**
```python
# Write your code below
is_raining = False
```

## Exercise 6.4: BOSS CHALLENGE — Login Gatekeeper
- **Type:** BOSS_CHALLENGE
- **Learn:** Real login systems chain `and`/`or`/`not` together to check multiple rules at once before granting access.
- **Instructions:** Set `username = "hero"` and `password = "1234"`. If `username == "hero" and password == "1234"`, print `Access granted`. Else print `Access denied`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** granted
- **Starter Code:**
```python
# Write your code below
username = "hero"
password = "1234"
```

---

# Unit 7: While Loops

## Exercise 7.1: The While Loop
- **Type:** LESSON
- **Learn:** A `while` loop repeats as long as its condition is `True`. Always change something inside so it eventually stops!
```python
count = 0
while count < 3:
    print(count)
    count += 1
```
- **Instructions:** Use a `while` loop to print the numbers `1` through `5`, one per line.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** 1
2
3
4
5
- **Starter Code:**
```python
# Write your code below
```

## Exercise 7.2: Counters
- **Type:** LESSON
- **Learn:** A counter variable tracks progress through a loop, usually starting at `0` and increasing by `1` (`+= 1`) each round.
```python
total = 0
i = 1
while i <= 3:
    total += i
    i += 1
print(total)
```
- **Instructions:** Use a `while` loop and a counter to add the numbers `1` through `10` into `total`, then print `total`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 55
- **Starter Code:**
```python
# Write your code below
```

## Exercise 7.3: Breaking and Skipping
- **Type:** LESSON
- **Learn:** `break` stops a loop completely. `continue` skips just the current round and moves to the next one.
```python
i = 0
while i < 5:
    i += 1
    if i == 3:
        break
    print(i)
```
- **Instructions:** Use a `while` loop with `i` starting at `0`. Increase `i` by 1 each round while `i < 10`. Use `continue` to skip printing even numbers, and print the odd ones.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** 9
- **Starter Code:**
```python
# Write your code below
i = 0
```

## Exercise 7.4: BOSS CHALLENGE — Password Retry Lock
- **Type:** BOSS_CHALLENGE
- **Learn:** Counters plus `break` power real security systems — like locking an account after too many failed tries.
- **Instructions:** Set `attempts = 0` and `correct = "sunshine"`. Loop through the list `guesses = ["rain", "cloudy", "sunshine"]` with a `while` loop, incrementing `attempts` each time. When a guess equals `correct`, print `Unlocked after {attempts} attempts` and `break`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Unlocked
- **Starter Code:**
```python
# Write your code below
attempts = 0
correct = "sunshine"
guesses = ["rain", "cloudy", "sunshine"]
i = 0
```

---

# Unit 8: For Loops & Ranges

## Exercise 8.1: The For Loop & range()
- **Type:** LESSON
- **Learn:** `for` loops walk through a sequence one item at a time. `range(n)` creates numbers `0` to `n-1` automatically.
```python
for i in range(3):
    print(i)
```
- **Instructions:** Use a `for` loop with `range()` to print `0` through `4`, one per line.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** 0
1
2
3
4
- **Starter Code:**
```python
# Write your code below
```

## Exercise 8.2: Custom Start & Stop
- **Type:** LESSON
- **Learn:** `range(start, stop)` lets you choose where counting begins instead of always starting at `0`.
```python
for i in range(2, 6):
    print(i)
```
- **Instructions:** Use `range(5, 11)` in a `for` loop to print the numbers `5` through `10`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** 10
- **Starter Code:**
```python
# Write your code below
```

## Exercise 8.3: Stepping Through
- **Type:** LESSON
- **Learn:** `range(start, stop, step)` lets you skip by any amount — even backward with a negative step.
```python
for i in range(0, 10, 2):
    print(i)
```
- **Instructions:** Use `range()` with a step of `2` to print every even number from `0` to `8`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** 0
2
4
6
8
- **Starter Code:**
```python
# Write your code below
```

## Exercise 8.4: BOSS CHALLENGE — Multiplication Table Generator
- **Type:** BOSS_CHALLENGE
- **Learn:** Stepping ranges combined with f-strings is exactly how real "table generator" tools and study apps work.
- **Instructions:** Ask for a number using `int(input("Enter a number: "))`. Use a `for` loop with `range(1, 6)` to print that number's multiplication table from ×1 to ×5 (e.g. `5 x 1 = 5`).
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** x 1 =
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "5"
```

---

# Unit 9: Lists & Backpacks

## Exercise 9.1: Packing a Backpack
- **Type:** LESSON
- **Learn:** A list `[]` holds multiple items in order, like a backpack full of gear. Access items by their index, starting at `0`.
```python
backpack = ["sword", "shield", "potion"]
print(backpack[0])
```
- **Instructions:** Create a list `fruits = ["apple", "banana", "cherry"]` and print the item at index `1`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** banana
- **Starter Code:**
```python
# Write your code below
```

## Exercise 9.2: Adding Gear (.append())
- **Type:** LESSON
- **Learn:** `.append()` adds an item to the end of a list — like tossing a new item into your backpack.
```python
items = ["sword"]
items.append("shield")
print(items)
```
- **Instructions:** Start with `inventory = ["potion", "gold"]`. Append `"map"`, then print the full list.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** map
- **Starter Code:**
```python
# Write your code below
inventory = ["potion", "gold"]
```

## Exercise 9.3: Dropping Gear (.pop())
- **Type:** LESSON
- **Learn:** `.pop()` removes and returns the last item in a list (or a specific index if you give it a number).
```python
items = ["sword", "shield", "potion"]
dropped = items.pop()
print(dropped)
print(items)
```
- **Instructions:** Start with `bag = ["rope", "torch", "map"]`. Use `.pop()` to remove the last item and print what was removed.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** map
- **Starter Code:**
```python
# Write your code below
bag = ["rope", "torch", "map"]
```

## Exercise 9.4: BOSS CHALLENGE — Inventory Manager
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining `.append()` and `.pop()` in one program is how real inventory systems (games, shopping carts) manage a changing set of items.
- **Instructions:** Start with `inventory = ["sword", "shield"]`. Append `"potion"`. Then pop the first item added at the very start using `inventory.pop(0)`. Print the final list.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** potion
- **Starter Code:**
```python
# Write your code below
inventory = ["sword", "shield"]
```

---

# Unit 10: List Operations

## Exercise 10.1: Counting Items (len())
- **Type:** LESSON
- **Learn:** `len()` tells you how many items are in a list — handy for loops and validation checks.
```python
crew = ["Ana", "Bo", "Cy"]
print(len(crew))
```
- **Instructions:** Given `team = ["Ann", "Ben", "Cass", "Deb"]`, print how many members are on the team using `len()`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 4
- **Starter Code:**
```python
# Write your code below
team = ["Ann", "Ben", "Cass", "Deb"]
```

## Exercise 10.2: Totals and Extremes (sum(), max())
- **Type:** LESSON
- **Learn:** `sum()` adds every number in a list. `max()` and `min()` find the biggest and smallest values instantly.
```python
scores = [10, 20, 30]
print(sum(scores))
print(max(scores))
```
- **Instructions:** Given `prices = [12, 8, 25, 4]`, print the sum of all prices using `sum()`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 49
- **Starter Code:**
```python
# Write your code below
prices = [12, 8, 25, 4]
```

## Exercise 10.3: Putting Things in Order (sorted())
- **Type:** LESSON
- **Learn:** `sorted()` returns a new list arranged from smallest to largest (or use `reverse=True` for largest first).
```python
nums = [5, 1, 4]
print(sorted(nums))
```
- **Instructions:** Given `scores = [42, 17, 88, 3]`, print the list sorted from smallest to largest.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** [3, 17, 42, 88]
- **Starter Code:**
```python
# Write your code below
scores = [42, 17, 88, 3]
```

## Exercise 10.4: BOSS CHALLENGE — Class Grade Analyzer
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining `len()`, `sum()`, and `max()` on the same list is exactly how real grading and analytics tools compute averages and highs at once.
- **Instructions:** Given `grades = [88, 92, 79, 95, 60]`, calculate and print the average (`sum(grades) / len(grades)`) and the highest grade using `max(grades)`, each on its own line.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** 95
- **Starter Code:**
```python
# Write your code below
grades = [88, 92, 79, 95, 60]
```

---

# Unit 11: Dictionaries & Lookup

## Exercise 11.1: A Drawer of Facts
- **Type:** LESSON
- **Learn:** A dictionary `{}` stores `key: value` pairs, like labeled drawers. You look things up by key instead of by position.
```python
hero = {"name": "Zara", "hp": 100}
print(hero["name"])
```
- **Instructions:** Create `player = {"name": "Rex", "level": 3}` and print the value for `"level"`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 3
- **Starter Code:**
```python
# Write your code below
```

## Exercise 11.2: Safe Lookups (.get())
- **Type:** LESSON
- **Learn:** `.get()` looks up a key safely — if the key doesn't exist, it returns `None` (or a default you choose) instead of crashing.
```python
pet = {"type": "dragon"}
print(pet.get("name", "Unnamed"))
```
- **Instructions:** Given `car = {"brand": "Toyota"}`, use `.get("color", "Unknown")` to safely print the color, which should fall back to `Unknown`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Unknown
- **Starter Code:**
```python
# Write your code below
car = {"brand": "Toyota"}
```

## Exercise 11.3: Looping Through Drawers
- **Type:** LESSON
- **Learn:** `.items()` gives you both the key and value together while looping, so you can print or process both at once.
```python
stats = {"hp": 10, "mp": 5}
for key, value in stats.items():
    print(key, value)
```
- **Instructions:** Loop through `scores = {"math": 90, "art": 85}` using `.items()` and print each as `subject: score`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** math: 90
- **Starter Code:**
```python
# Write your code below
scores = {"math": 90, "art": 85}
```

## Exercise 11.4: BOSS CHALLENGE — Inventory Value Checker
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining dictionaries and loops with running totals is exactly how real inventory and pricing systems calculate worth.
- **Instructions:** Given `inventory = {"sword": 50, "shield": 30, "potion": 5}`, loop through the values and sum them into `total_value`, then print the total.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 85
- **Starter Code:**
```python
# Write your code below
inventory = {"sword": 50, "shield": 30, "potion": 5}
total_value = 0
```

---

# Unit 12: Custom Functions

## Exercise 12.1: Casting Your First Spell
- **Type:** LESSON
- **Learn:** A function is a reusable spell you define once with `def` and cast (call) as many times as you like.
```python
def greet():
    print("Hello!")

greet()
```
- **Instructions:** Define a function `shout()` that prints `LOUD NOISES!`, then call it.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** LOUD NOISES!
- **Starter Code:**
```python
# Write your code below
```

## Exercise 12.2: Spells With Ingredients (Parameters)
- **Type:** LESSON
- **Learn:** Parameters let a spell take ingredients — inputs that change what the function does each time.
```python
def greet(name):
    print(f"Hello, {name}!")

greet("Finn")
```
- **Instructions:** Define `power_up(level)` that prints `Reached level {level}!`. Call it with `4`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** level 4
- **Starter Code:**
```python
# Write your code below
```

## Exercise 12.3: Spells That Hand Something Back
- **Type:** LESSON
- **Learn:** `return` sends a value out of the function so you can store it or use it, instead of just printing inside.
```python
def double(n):
    return n * 2

result = double(5)
print(result)
```
- **Instructions:** Define `add(a, b)` that returns `a + b`. Call `add(7, 8)`, store it in `result`, then print `result`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 15
- **Starter Code:**
```python
# Write your code below
```

## Exercise 12.4: BOSS CHALLENGE — Rock, Paper, Scissors Judge
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining parameters, return values, and conditionals inside one function is how real game logic is built — a self-contained "judge" you can call anytime.
- **Instructions:** Define `judge(p1, p2)` that returns `"Player 1 wins"` if p1 beats p2, `"Player 2 wins"` if p2 beats p1, or `"Tie"` if equal. Rules: rock beats scissors, scissors beats paper, paper beats rock. Call `judge("rock", "scissors")` and print the result.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Player 1
- **Starter Code:**
```python
# Write your code below
def judge(p1, p2):
    pass
```

---

# Unit 13: String Manipulation

## Exercise 13.1: Case & Cleanup
- **Type:** LESSON
- **Learn:** `.upper()`, `.lower()`, and `.strip()` reshape text — great for cleaning messy user input.
```python
text = "  Hello  "
print(text.strip().upper())
```
- **Instructions:** Given `raw = "  Pylen  "`, print it stripped of whitespace and converted to lowercase.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** pylen
- **Starter Code:**
```python
# Write your code below
raw = "  Pylen  "
```

## Exercise 13.2: Split & Join
- **Type:** LESSON
- **Learn:** `.split()` breaks a string into a list of pieces. `.join()` glues a list back into one string.
```python
sentence = "one two three"
words = sentence.split()
print(words)
```
- **Instructions:** Given `sentence = "coding is awesome"`, split it into words and print the resulting list.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** awesome
- **Starter Code:**
```python
# Write your code below
sentence = "coding is awesome"
```

## Exercise 13.3: f-strings With Style
- **Type:** LESSON
- **Learn:** f-strings can also format numbers, like rounding decimals with `:.2f` for two decimal places.
```python
price = 19.5
print(f"${price:.2f}")
```
- **Instructions:** Given `pi = 3.14159`, use an f-string with `:.2f` to print it rounded to 2 decimal places.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** 3.14
- **Starter Code:**
```python
# Write your code below
pi = 3.14159
```

## Exercise 13.4: BOSS CHALLENGE — Palindrome Checker
- **Type:** BOSS_CHALLENGE
- **Learn:** Palindromes (words that read the same backward) are a classic string puzzle, combining slicing, cleanup, and comparisons.
- **Instructions:** Ask the user for a word with `input("Enter a word: ")`, clean it with `.lower().strip()`, then check if it equals its own reverse (`word[::-1]`). Print `Palindrome!` if true, else `Not a palindrome`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Palindrome
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "level"
```

---

# Unit 14: Error Handling

## Exercise 14.1: Catching Trouble
- **Type:** LESSON
- **Learn:** `try/except` lets your program catch errors gracefully instead of crashing, like a safety net.
```python
try:
    print(10 / 0)
except ZeroDivisionError:
    print("Can't divide by zero!")
```
- **Instructions:** Try to convert `"abc"` to an int using `int("abc")` inside a `try` block. Catch the `ValueError` and print `Invalid number`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Invalid number
- **Starter Code:**
```python
# Write your code below
```

## Exercise 14.2: Catching User Mistakes
- **Type:** LESSON
- **Learn:** Wrapping `input()` conversions in `try/except` protects your program when a user types something unexpected.
```python
try:
    age = int(input("Age: "))
    print(age)
except ValueError:
    print("That's not a number!")
```
- **Instructions:** Wrap `age = int(input("Enter your age: "))` in a `try/except ValueError` block. In the except, print `That's not a number!`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** number
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "abc" to trigger the except branch
```

## Exercise 14.3: Raising Your Own Alarms
- **Type:** LESSON
- **Learn:** `raise` lets your code trigger its own error on purpose when something doesn't make sense.
```python
age = -5
if age < 0:
    raise ValueError("Age can't be negative")
```
- **Instructions:** Inside a `try/except`, raise `ValueError("Too low")` if `score = -1` is less than `0`, and in the except block print `Caught: Too low` using `print(f"Caught: {e}")`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Too low
- **Starter Code:**
```python
# Write your code below
score = -1
```

## Exercise 14.4: BOSS CHALLENGE — Safe Divider Utility
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining functions with error handling is how professional tools stay reliable no matter what input a user throws at them.
- **Instructions:** Define `safe_divide(a, b)` that returns the division result, but catches `ZeroDivisionError` and returns the string `"Cannot divide by zero"` instead of crashing. Call it with `safe_divide(10, 0)` and print the result.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Cannot divide
- **Starter Code:**
```python
# Write your code below
def safe_divide(a, b):
    pass
```

---

# Unit 15: List Comprehensions

## Exercise 15.1: The One-Line Loop
- **Type:** LESSON
- **Learn:** A list comprehension builds a new list from an existing one in a single, compact line: `[expression for item in list]`.
```python
nums = [1, 2, 3]
doubled = [n * 2 for n in nums]
print(doubled)
```
- **Instructions:** Given `nums = [1, 2, 3, 4]`, use a list comprehension to create `squares`, a list of each number squared, and print it.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** [1, 4, 9, 16]
- **Starter Code:**
```python
# Write your code below
nums = [1, 2, 3, 4]
```

## Exercise 15.2: Filtering With Conditions
- **Type:** LESSON
- **Learn:** Add `if` to a comprehension to filter — only items that pass the test make it into the new list.
```python
nums = [1, 2, 3, 4, 5]
evens = [n for n in nums if n % 2 == 0]
print(evens)
```
- **Instructions:** Given `words = ["hi", "hello", "yo", "greetings"]`, use a comprehension to keep only words longer than 2 letters, and print the result.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** hello
- **Starter Code:**
```python
# Write your code below
words = ["hi", "hello", "yo", "greetings"]
```

## Exercise 15.3: Transform and Filter Together
- **Type:** LESSON
- **Learn:** Comprehensions can transform *and* filter at once — combining an expression with an `if` clause in a single line.
```python
nums = [1, 2, 3, 4, 5, 6]
result = [n * n for n in nums if n % 2 == 0]
print(result)
```
- **Instructions:** Given `nums = [1, 2, 3, 4, 5, 6, 7, 8]`, use one comprehension to build a list of the squares of only the odd numbers.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** [1, 9, 25, 49]
- **Starter Code:**
```python
# Write your code below
nums = [1, 2, 3, 4, 5, 6, 7, 8]
```

## Exercise 15.4: BOSS CHALLENGE — Leaderboard Ranker
- **Type:** BOSS_CHALLENGE
- **Learn:** Comprehensions and sorting together power real leaderboard and ranking systems in games and apps.
- **Instructions:** Given `players = {"Ace": 42, "Nova": 88, "Rex": 15}`, use `sorted()` with a `lambda` on `.items()` to sort players by score descending, then print just the winner's name.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Nova
- **Starter Code:**
```python
# Write your code below
players = {"Ace": 42, "Nova": 88, "Rex": 15}
```

---

# Unit 16: Object-Oriented Play

## Exercise 16.1: Blueprints (Classes)
- **Type:** LESSON
- **Learn:** A class is a blueprint for creating objects. `__init__` sets up each new object's starting properties, and `self` refers to that specific object.
```python
class Hero:
    def __init__(self, name):
        self.name = name

h = Hero("Zara")
print(h.name)
```
- **Instructions:** Create a class `Pet` with `__init__(self, name)` storing `self.name`. Make `p = Pet("Fluffy")` and print `p.name`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Fluffy
- **Starter Code:**
```python
# Write your code below
```

## Exercise 16.2: Giving Objects Abilities (Methods)
- **Type:** LESSON
- **Learn:** Methods are functions that live inside a class, giving every object built from it its own built-in abilities.
```python
class Dog:
    def bark(self):
        print("Woof!")

d = Dog()
d.bark()
```
- **Instructions:** Create class `Robot` with a method `greet(self)` that prints `Beep boop, hello!`. Make an instance and call `greet()`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Beep boop
- **Starter Code:**
```python
# Write your code below
```

## Exercise 16.3: Inheritance — Passing Down Traits
- **Type:** LESSON
- **Learn:** A class can inherit from another, gaining its abilities for free while adding its own — like a subclass of animal.
```python
class Animal:
    def speak(self):
        print("...")

class Cat(Animal):
    def speak(self):
        print("Meow")

Cat().speak()
```
- **Instructions:** Create class `Vehicle` with a method `move(self)` that prints `Moving...`. Create class `Car(Vehicle)` that does not override `move`. Call `Car().move()`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Moving...
- **Starter Code:**
```python
# Write your code below
```

## Exercise 16.4: BOSS CHALLENGE — Battle Arena Simulator
- **Type:** BOSS_CHALLENGE
- **Learn:** Real games model fighters as objects with state (HP) and behavior (attack) — this is OOP in action.
- **Instructions:** Create class `Fighter` with `__init__(self, name, hp)` storing both, and a method `attack(self, other, damage)` that subtracts `damage` from `other.hp`. Create `hero = Fighter("Hero", 100)` and `dragon = Fighter("Dragon", 50)`. Call `hero.attack(dragon, 20)`, then print `dragon.hp`.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 30
- **Starter Code:**
```python
# Write your code below
class Fighter:
    pass
```

---

# Unit 17: File Operations

## Exercise 17.1: Writing to a File
- **Type:** LESSON
- **Learn:** `with open(...) as f:` safely opens a file and auto-closes it when done. `"w"` mode writes fresh content (overwriting anything already there).
```python
with open("notes.txt", "w") as f:
    f.write("Hello file!")
```
- **Instructions:** Write the text `Quest log started` to a file named `log.txt`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Quest log started
- **Starter Code:**
```python
# Write your code below
```

## Exercise 17.2: Reading From a File
- **Type:** LESSON
- **Learn:** Opening a file in `"r"` mode (read) lets you pull its saved contents back into your program.
```python
with open("notes.txt", "r") as f:
    content = f.read()
    print(content)
```
- **Instructions:** First write `Adventure begins` to `story.txt`, then open it again in `"r"` mode and print its contents.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Adventure begins
- **Starter Code:**
```python
# Write your code below
```

## Exercise 17.3: Appending Without Erasing
- **Type:** LESSON
- **Learn:** `"a"` mode (append) adds new text to the end of a file instead of erasing what's already there.
```python
with open("log.txt", "a") as f:
    f.write("New entry\n")
```
- **Instructions:** Write `Day 1` to `journal.txt` in `"w"` mode, then use `"a"` mode to append `Day 2`. Read and print the full file contents.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Day 2
- **Starter Code:**
```python
# Write your code below
```

## Exercise 17.4: BOSS CHALLENGE — Quest Log Saver
- **Type:** BOSS_CHALLENGE
- **Learn:** Combining `input()` with file writing is how real apps save user progress permanently — like a save-game file.
- **Instructions:** Ask the user for a quest name with `input("Enter a quest name: ")`. Write it to `quest_log.txt`, then read the file back and print its contents.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** quest
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "Dragon Hunt"
```

---

# Unit 18: Decorators & Advanced Functions

## Exercise 18.1: Wrapping a Spell (Decorators)
- **Type:** LESSON
- **Learn:** A decorator wraps a function to add extra behavior without changing its code — like a magical cloak added on top.
```python
def shout(func):
    def wrapper():
        print(func().upper())
    return wrapper

@shout
def say_hi():
    return "hi"

say_hi()
```
- **Instructions:** Write a decorator `add_excitement` that wraps a function's returned string by appending `"!"`, then prints it. Decorate a function `greet()` that returns `"hello"`, then call it.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** hello!
- **Starter Code:**
```python
# Write your code below
def add_excitement(func):
    pass
```

## Exercise 18.2: Timing a Spell
- **Type:** LESSON
- **Learn:** Decorators are commonly used to log or track what a function does, like a stopwatch attached automatically.
```python
def logger(func):
    def wrapper():
        print("Running...")
        func()
        print("Done!")
    return wrapper
```
- **Instructions:** Write decorator `logger` that prints `Start` before calling the function and `End` after. Decorate `task()` which prints `Working`. Call `task()`.
- **Validation Type:** EXACT_VALUE
- **Expected Value:** Start
Working
End
- **Starter Code:**
```python
# Write your code below
def logger(func):
    pass
```

## Exercise 18.3: Decorators With Arguments
- **Type:** LESSON
- **Learn:** To decorate functions that take parameters, your `wrapper` needs to accept and forward `*args` to the original function.
```python
def logger(func):
    def wrapper(*args):
        print(f"Calling with {args}")
        return func(*args)
    return wrapper
```
- **Instructions:** Write decorator `logger` that prints `Calling with {args}` then calls and returns the wrapped function's result. Decorate `add(a, b)` which returns `a + b`. Call `add(3, 4)` and print the result.
- **Validation Type:** NUMBER_MATCH
- **Expected Value:** 7
- **Starter Code:**
```python
# Write your code below
def logger(func):
    pass
```

## Exercise 18.4: BOSS CHALLENGE — Async Task Runner
- **Type:** BOSS_CHALLENGE
- **Learn:** `async`/`await` with `asyncio.gather()` lets multiple tasks run concurrently — the engine behind fast, modern web servers and I/O-heavy apps. Pylen's in-browser runtime (Pyodide) already has an event loop running, so top-level code uses `await` directly instead of `asyncio.run()`.
- **Instructions:** Define `async def fetch(name)` that prints `Fetching {name}` and returns `name`. Use `await asyncio.gather(fetch("A"), fetch("B"))` at the top level (not inside `asyncio.run()`) to run both, then print the returned results.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Fetching A
- **Starter Code:**
```python
# Write your code below
import asyncio

async def fetch(name):
    pass

# Pyodide already runs an event loop, so call with top-level await
# instead of asyncio.run(main()) — that would raise "event loop is already running"
results = await asyncio.gather(fetch("A"), fetch("B"))
print(results)
```

---

# Unit 19: Capstone CLI Project

## Exercise 19.1: The Welcome Screen
- **Type:** LESSON
- **Learn:** Every good CLI app starts with a clear welcome message and asks the player for their name — combining Unit 1's `print()` with Unit 3's `input()`.
```python
print("=== Number Quest ===")
name = input("Enter your name: ")
print(f"Welcome, {name}!")
```
- **Instructions:** Print a title banner `=== Pylen Quest ===`, then ask the player's name with `input()` and print `Welcome, {name}!`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Welcome
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin here, e.g. input() will return "Hero"
```

## Exercise 19.2: Building the Game State
- **Type:** LESSON
- **Learn:** Real mini-games track state with variables and dictionaries — score, lives, and inventory all live in memory as the game runs.
```python
player = {"score": 0, "lives": 3}
player["score"] += 10
print(player)
```
- **Instructions:** Create `player = {"score": 0, "lives": 3}`. Increase `score` by `25` and decrease `lives` by `1`, then print the updated dictionary.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** 25
- **Starter Code:**
```python
# Write your code below
player = {"score": 0, "lives": 3}
```

## Exercise 19.3: The Game Loop
- **Type:** LESSON
- **Learn:** A `while` loop combined with `input()` and conditionals is the beating heart of any interactive CLI game — keep asking until the player wins, loses, or quits.
```python
lives = 3
while lives > 0:
    guess = input("Guess (or 'quit'): ")
    if guess == "quit":
        break
    lives -= 1
print("Game over")
```
- **Instructions:** Set `attempts = 3`. Use a `while` loop that runs while `attempts > 0`, asking `input("Enter a number 1-5: ")` each round and decreasing `attempts` by 1. After the loop, print `Game over`.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Game over
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin for each input() call, e.g. "1", then "2", then "3"
attempts = 3
```

## Exercise 19.4: BOSS CHALLENGE — Number Guessing Game
- **Type:** BOSS_CHALLENGE
- **Learn:** This capstone combines everything: `input()`/`int()` from Unit 3, loops from Units 7-8, conditionals from Units 5-6, and functions from Unit 12 — into one complete interactive mini-game.
- **Instructions:** Set `secret = 7` and `attempts = 0`. Use a `while` loop that keeps running until the player guesses correctly: read a guess with `int(input("Guess the number (1-10): "))`, increment `attempts`, and print `Too high` or `Too low` if wrong. When the guess matches `secret`, print `Correct! It took you {attempts} attempts` and end the loop.
- **Validation Type:** CONTAINS_VALUE
- **Expected Value:** Correct!
- **Starter Code:**
```python
# Write your code below
# Automated grading feeds mock stdin for each input() call, e.g. "3", then "5", then "7"
secret = 7
attempts = 0
```
