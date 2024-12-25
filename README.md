
Entries are saved to and loaded from localStorage, ensuring persistence across page reloads.
Adding Entries:

Users can add entries with descriptions, amounts, and a type (income or expense).
Validation ensures valid inputs for description and amount.
Editing Entries:

The editEntry function pre-fills the input fields and updates the button functionality to allow editing an existing entry.
Deleting Entries:

Entries can be deleted, and the UI updates dynamically to reflect changes.
Filters:

Users can filter entries by type (income, expense, or all).
Dynamic UI Update:

The updateEntry function recalculates totals and net balance and dynamically updates the displayed entries.
Clear Fields:

Input fields are cleared after adding or updating an entry.
Responsive Defaults:

Ensures the application initializes correctly with window.onload.
