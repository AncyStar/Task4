let entries = JSON.parse(localStorage.getItem('entries')) || [];
        let filter = 'all';

        // Function to add an entry
        function addEntry() {
            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const type = document.querySelector('input[name="type"]:checked').value;  // Get value from selected radio button

            if (!description || isNaN(amount)) {
                alert('Please enter a valid description and amount.');
                return;
            }

            const entry = {
                id: Date.now(),
                description: description,
                amount: amount,
                type: type
            };

            entries.push(entry);
            localStorage.setItem('entries', JSON.stringify(entries));
            updateEntry();
            clearFields();
        }

        // Function to update the UI
        function updateEntry() {
            const entryList = document.getElementById('entry-list');
            entryList.innerHTML = '';

            let totalIncome = 0;
            let totalExpense = 0;

            entries.forEach(entry => {
                if (filter === 'all' || entry.type === filter) {
                    const entryElement = document.createElement('div');
                    entryElement.innerHTML = `
                    <div class="w-full bg-white flex items-center p-4 px-4 border rounded-lg shadow-lg">
                        <span class="w-1/3 text-center">${entry.description}</span>
                        <span class="w-1/3 text-center">${entry.amount}</span>
                        <span class="w-1/3 text-center">${entry.type}</span>
                        <div class="w-1/4 flex justify-evenly items-center space-x-2">
                            <button onclick="editEntry(${entry.id})" class="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600">Edit</button>
                            <button onclick="deleteEntry(${entry.id})" class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Delete</button>
                        </div>
                    </div>`;
                    entryList.appendChild(entryElement);

                    if (entry.type === 'income') {
                        totalIncome += entry.amount;
                    } else {
                        totalExpense += entry.amount;
                    }
                }
            });

            document.getElementById('total-income').textContent = totalIncome;
            document.getElementById('total-expense').textContent = totalExpense;
            document.getElementById('net-balance').textContent = totalIncome - totalExpense;
        }

        // Function to delete an entry
        function deleteEntry(id) {
            entries = entries.filter(entry => entry.id !== id);
            localStorage.setItem('entries', JSON.stringify(entries));
            updateEntry();
        }

        // Function to edit an entry
        function editEntry(id) {
            const entry = entries.find(entry => entry.id === id);
            if (!entry) return;

            document.getElementById('description').value = entry.description;
            document.getElementById('amount').value = entry.amount;
            document.querySelector(`input[name="type"][value="${entry.type}"]`).checked = true;

            // Change button to "Update"
            document.getElementById('submit-btn').textContent = 'Update Entry';
            document.getElementById('submit-btn').onclick = function () {
            
            updateEntryii(id);
            };
        }

        // Update entry after editing
        function updateEntryii(id) {
            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const type = document.querySelector('input[name="type"]:checked').value;

            if (!description || isNaN(amount)) {
                alert('Please fill in both description and amount');
                return;
            }

            const updatedEntry = {
                id,
                description,
                amount,
                type
            };

            entries = entries.map(entry => entry.id === id ? updatedEntry : entry);
            localStorage.setItem('entries', JSON.stringify(entries));
            updateEntry();
            clearFields();
        }

        // Clear input fields
        function clearFields() {
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
            document.querySelector('input[name="type"][value="income"]').checked = true;
            document.getElementById('submit-btn').textContent = 'Add';
            document.getElementById('submit-btn').onclick = addEntry;
        }

        // Apply filter for displaying entries
        function applyFilter() {
            filter = document.querySelector('input[name="filter"]:checked').value;
            updateEntry();
        }

        // Default to Income
        window.onload = updateEntry;