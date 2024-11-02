document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('menuItems')) {
        loadMenuItems(); // Load menu items if on the Menu page
    }
    if (document.getElementById('branchInfo')) {
        loadBranchInfo(); // Load branch information if on the Contact page
    }
});

// Function to handle form submission with alert
function submitForm(event) {
    event.preventDefault(); // Prevents actual form submission
    alert("Thank you for reaching out! Your message has been sent.");
    document.getElementById("contactForm").reset(); // Clears the form fields
}

// Load Menu Items
function loadMenuItems() {
    fetch('menu.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const menuItemsContainer = document.getElementById('menuItems');
            menuItemsContainer.innerHTML = ''; // Clear existing content

            const categories = xml.getElementsByTagName('category');
            Array.from(categories).forEach(category => {
                const categoryType = category.getAttribute('type');
                let categoryHTML = `<section class="menu-category"><h2>${categoryType}</h2>`;

                const items = category.getElementsByTagName('item');
                Array.from(items).forEach(item => {
                    const name = item.getAttribute('name');
                    const price = item.getAttribute('price');
                    const description = item.getElementsByTagName('description')[0].textContent;
                    const imagePath = item.getElementsByTagName('image')[0].textContent;

                    categoryHTML += `
                        <div class="menu-item">
                            <img src="${imagePath}" alt="${name}">
                            <div class="item-details">
                                <h3>${name} - $${price}</h3>
                                <p>${description}</p>
                            </div>
                        </div>
                    `;
                });

                categoryHTML += '</section>';
                menuItemsContainer.innerHTML += categoryHTML;
            });
        })
        .catch(error => console.error('Error loading the menu XML:', error));
}

// Load Branch Information for Contact Page
function loadBranchInfo() {
    fetch('branches.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const branches = xml.getElementsByTagName('branch');
            const container = document.getElementById('branchInfo');
            container.innerHTML = ''; // Clear existing content

            Array.from(branches).forEach(branch => {
                const address = branch.getElementsByTagName('address')[0].textContent;
                const contact = branch.getElementsByTagName('contact')[0].textContent;
                const hours = branch.getElementsByTagName('hours')[0].textContent;
                const mapLink = branch.getElementsByTagName('mapLink')[0].textContent;

                container.innerHTML += `
                    <div class="branch">
                        <h3>${address}</h3>
                        <p>Contact: ${contact}</p>
                        <p>Hours: ${hours}</p>
                        <a href="${mapLink}" target="_blank">View on Map</a>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error loading the branch XML:', error));
}
