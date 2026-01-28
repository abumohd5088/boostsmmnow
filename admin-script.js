// Admin Dashboard Functions
let ordersChart = null;
let revenueChart = null;

// Initialize Admin Dashboard
function initializeAdminDashboard() {
    // Initialize charts
    initializeCharts();
    
    // Load dashboard data
    loadDashboardData();
    
    // Set up event listeners for admin-specific actions
    setupAdminEventListeners();
    
    // Start real-time updates
    startRealTimeUpdates();
}

// Initialize Charts
function initializeCharts() {
    const ordersChartCtx = document.getElementById('ordersChart');
    if (ordersChartCtx) {
        ordersChart = new Chart(ordersChartCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Orders',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }
}

// Load Dashboard Data
function loadDashboardData() {
    // Simulate loading data from API
    setTimeout(() => {
        // Update total revenue
        const totalRevenue = 12543.67;
        document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
        
        // Update total orders
        const totalOrders = 3421;
        document.getElementById('totalOrders').textContent = totalOrders.toLocaleString();
        
        // Update total users
        const totalUsers = 854;
        document.getElementById('totalUsers').textContent = totalUsers.toLocaleString();
        
        // Update pending tasks
        const pendingTasks = 23;
        document.getElementById('pendingTasks').textContent = pendingTasks;
        
        // Load recent orders
        loadRecentOrders();
        
        // Load services status
        loadServicesStatus();
        
        // Update badges
        updateBadges();
    }, 1000);
}

// Load Recent Orders
function loadRecentOrders() {
    const recentOrdersContainer = document.getElementById('recentOrders');
    if (!recentOrdersContainer) return;
    
    const orders = [
        {id: 'ORD-12345', service: 'Instagram Followers', user: 'john_doe', amount: 25.00, status: 'Completed', date: new Date()},
        {id: 'ORD-12346', service: 'YouTube Views', user: 'jane_smith', amount: 45.00, status: 'Processing', date: new Date(Date.now() - 3600000)},
        {id: 'ORD-12347', service: 'Facebook Likes', user: 'mike_jones', amount: 15.00, status: 'Pending', date: new Date(Date.now() - 7200000)},
        {id: 'ORD-12348', service: 'Twitter Retweets', user: 'sara_wilson', amount: 30.00, status: 'Completed', date: new Date(Date.now() - 10800000)},
        {id: 'ORD-12349', service: 'TikTok Likes', user: 'alex_chen', amount: 20.00, status: 'Failed', date: new Date(Date.now() - 14400000)}
    ];
    
    recentOrdersContainer.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        let statusClass = '';
        switch(order.status.toLowerCase()) {
            case 'completed':
                statusClass = 'status-completed';
                break;
            case 'processing':
                statusClass = 'status-processing';
                break;
            case 'pending':
                statusClass = 'status-pending';
                break;
            case 'failed':
                statusClass = 'status-failed';
                break;
        }
        
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.service}</td>
            <td>${order.user}</td>
            <td>${formatCurrency(order.amount)}</td>
            <td><span class="status-badge ${statusClass}">${order.status}</span></td>
            <td>${formatDate(order.date)}</td>
        `;
        
        recentOrdersContainer.appendChild(row);
    });
}

// Load Services Status
function loadServicesStatus() {
    const servicesStatusContainer = document.getElementById('servicesStatus');
    if (!servicesStatusContainer) return;
    
    const services = [
        {name: 'Instagram', icon: 'fab fa-instagram', status: 'online', uptime: '99.8%'},
        {name: 'YouTube', icon: 'fab fa-youtube', status: 'online', uptime: '99.5%'},
        {name: 'Facebook', icon: 'fab fa-facebook', status: 'offline', uptime: '95.2%'},
        {name: 'Twitter', icon: 'fab fa-twitter', status: 'online', uptime: '99.1%'},
        {name: 'TikTok', icon: 'fab fa-tiktok', status: 'online', uptime: '98.7%'},
        {name: 'Telegram', icon: 'fab fa-telegram', status: 'online', uptime: '99.9%'}
    ];
    
    servicesStatusContainer.innerHTML = '';
    
    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-status-item';
        
        serviceItem.innerHTML = `
            <div class="service-icon" style="color: ${service.status === 'online' ? '#4CAF50' : '#f94144'}">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-info">
                <h4>${service.name}</h4>
                <p>Uptime: ${service.uptime}</p>
            </div>
            <div class="status-indicator ${service.status}"></div>
        `;
        
        servicesStatusContainer.appendChild(serviceItem);
    });
}

// Update Badges
function updateBadges() {
    const orderBadge = document.getElementById('orderBadge');
    const userBadge = document.getElementById('userBadge');
    const ticketBadge = document.getElementById('ticketBadge');
    
    if (orderBadge) orderBadge.textContent = '23';
    if (userBadge) userBadge.textContent = '5';
    if (ticketBadge) ticketBadge.textContent = '12';
}

// Setup Admin Event Listeners
function setupAdminEventListeners() {
    // Quick action buttons
    const addServiceBtn = document.getElementById('addServiceBtn');
    const addUserBtn = document.getElementById('addUserBtn');
    const processOrdersBtn = document.getElementById('processOrdersBtn');
    const updatePricesBtn = document.getElementById('updatePricesBtn');
    const sendNotificationBtn = document.getElementById('sendNotificationBtn');
    const backupDataBtn = document.getElementById('backupDataBtn');
    
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', () => {
            showAddServiceModal();
        });
    }
    
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            showToast('Add User feature coming soon!', 'info');
        });
    }
    
    if (processOrdersBtn) {
        processOrdersBtn.addEventListener('click', () => {
            processPendingOrders();
        });
    }
    
    if (updatePricesBtn) {
        updatePricesBtn.addEventListener('click', () => {
            showToast('Update Prices feature coming soon!', 'info');
        });
    }
    
    if (sendNotificationBtn) {
        sendNotificationBtn.addEventListener('click', () => {
            sendNotificationToUsers();
        });
    }
    
    if (backupDataBtn) {
        backupDataBtn.addEventListener('click', () => {
            backupPanelData();
        });
    }
    
    // Chart range selector
    const chartRange = document.getElementById('chartRange');
    if (chartRange) {
        chartRange.addEventListener('change', (e) => {
            updateChartData(e.target.value);
        });
    }
}

// Show Add Service Modal
function showAddServiceModal() {
    const modal = document.getElementById('addServiceModal');
    if (modal) {
        modal.querySelector('.modal-body').innerHTML = `
            <form id="addServiceForm">
                <div class="form-group">
                    <label for="serviceName">Service Name</label>
                    <input type="text" id="serviceName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="serviceCategory">Category</label>
                    <select id="serviceCategory" class="form-control" required>
                        <option value="">Select Category</option>
                        <option value="instagram">Instagram</option>
                        <option value="youtube">YouTube</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                        <option value="tiktok">TikTok</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="serviceType">Service Type</label>
                    <select id="serviceType" class="form-control" required>
                        <option value="">Select Type</option>
                        <option value="followers">Followers</option>
                        <option value="likes">Likes</option>
                        <option value="views">Views</option>
                        <option value="comments">Comments</option>
                        <option value="shares">Shares</option>
                    </select>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="serviceMin">Min Quantity</label>
                            <input type="number" id="serviceMin" class="form-control" value="100" required>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="serviceMax">Max Quantity</label>
                            <input type="number" id="serviceMax" class="form-control" value="10000" required>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="servicePrice">Price per 1000</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" id="servicePrice" class="form-control" step="0.01" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="serviceDescription">Description</label>
                    <textarea id="serviceDescription" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary modal-close">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Service</button>
                </div>
            </form>
        `;
        
        modal.classList.add('active');
        
        // Handle form submission
        const form = document.getElementById('addServiceForm');
        if (form) {
            form.addEventListener('submit', handleAddService);
        }
        
        // Reinitialize modal close buttons
        const modalCloseBtns = modal.querySelectorAll('.modal-close');
        modalCloseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        });
    }
}

// Handle Add Service
function handleAddService(e) {
    e.preventDefault();
    
    const serviceName = document.getElementById('serviceName').value;
    const serviceCategory = document.getElementById('serviceCategory').value;
    const servicePrice = document.getElementById('servicePrice').value;
    
    // Simulate API call
    setTimeout(() => {
        showToast(`Service "${serviceName}" added successfully!`, 'success');
        document.getElementById('addServiceModal').classList.remove('active');
        
        // Add activity to feed
        addActivityToFeed(`New service "${serviceName}" added to ${serviceCategory}`);
    }, 1000);
}

// Process Pending Orders
function processPendingOrders() {
    showToast('Processing pending orders...', 'info');
    
    // Simulate processing
    setTimeout(() => {
        const processedCount = Math.floor(Math.random() * 5) + 1;
        showToast(`${processedCount} orders processed successfully!`, 'success');
        
        // Add activity to feed
        addActivityToFeed(`${processedCount} pending orders processed`);
        
        // Update pending tasks counter
        const pendingTasksElement = document.getElementById('pendingTasks');
        if (pendingTasksElement) {
            let current = parseInt(pendingTasksElement.textContent) || 0;
            current = Math.max(0, current - processedCount);
            pendingTasksElement.textContent = current;
        }
    }, 2000);
}

// Send Notification to Users
function sendNotificationToUsers() {
    const message = prompt('Enter notification message to send to all users:');
    if (message) {
        showToast('Notification sent to all users!', 'success');
        addActivityToFeed(`Notification sent: "${message}"`);
    }
}

// Backup Panel Data
function backupPanelData() {
    showToast('Creating backup...', 'info');
    
    // Simulate backup process
    setTimeout(() => {
        const backupSize = (Math.random() * 50 + 10).toFixed(2);
        showToast(`Backup completed! (${backupSize} MB)`, 'success');
        addActivityToFeed(`Panel data backup created (${backupSize} MB)`);
    }, 3000);
}

// Update Chart Data
function updateChartData(range) {
    if (!ordersChart) return;
    
    let labels, data;
    
    switch(range) {
        case 'today':
            labels = ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM', '12AM'];
            data = [30, 45, 60, 75, 65, 50, 40];
            break;
        case 'week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [65, 59, 80, 81, 56, 55, 70];
            break;
        case 'month':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [1200, 1900, 1500, 2200];
            break;
        case 'year':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = [5000, 5500, 6000, 5800, 6200, 6500, 7000, 6800, 7200, 7500, 7800, 8000];
            break;
    }
    
    ordersChart.data.labels = labels;
    ordersChart.data.datasets[0].data = data;
    ordersChart.update();
    
    showToast(`Chart updated to show ${range} data`, 'info');
}

// Start Real-time Updates
function startRealTimeUpdates() {
    // Simulate real-time order updates
    setInterval(() => {
        const hasNewOrder = Math.random() > 0.7;
        if (hasNewOrder) {
            const orderId = 'ORD-' + (Math.floor(Math.random() * 90000) + 10000);
            const services = ['Instagram Followers', 'YouTube Views', 'Facebook Likes', 'Twitter Retweets', 'TikTok Likes'];
            const service = services[Math.floor(Math.random() * services.length)];
            const amount = (Math.random() * 50 + 5).toFixed(2);
            
            // Add to recent orders table
            addNewOrderToTable({
                id: orderId,
                service: service,
                user: 'user_' + Math.floor(Math.random() * 1000),
                amount: parseFloat(amount),
                status: 'Processing',
                date: new Date()
            });
            
            // Add activity
            addActivityToFeed(`New order ${orderId} placed for ${service}`);
            
            // Update counters
            updateOrderCounters(1, parseFloat(amount));
        }
    }, 10000); // Every 10 seconds
}

// Add New Order to Table
function addNewOrderToTable(order) {
    const recentOrdersContainer = document.getElementById('recentOrders');
    if (!recentOrdersContainer) return;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><strong>${order.id}</strong></td>
        <td>${order.service}</td>
        <td>${order.user}</td>
        <td>${formatCurrency(order.amount)}</td>
        <td><span class="status-badge status-processing">${order.status}</span></td>
        <td>${formatDate(order.date)}</td>
    `;
    
    // Add to top of table
    if (recentOrdersContainer.firstChild) {
        recentOrdersContainer.insertBefore(row, recentOrdersContainer.firstChild);
    } else {
        recentOrdersContainer.appendChild(row);
    }
    
    // Limit to 10 rows
    const rows = recentOrdersContainer.querySelectorAll('tr');
    if (rows.length > 10) {
        rows[rows.length - 1].remove();
    }
}

// Update Order Counters
function updateOrderCounters(orderCount, amount) {
    // Update total orders
    const totalOrdersElement = document.getElementById('totalOrders');
    if (totalOrdersElement) {
        let current = parseInt(totalOrdersElement.textContent.replace(/,/g, '')) || 0;
        current += orderCount;
        totalOrdersElement.textContent = current.toLocaleString();
    }
    
    // Update total revenue
    const totalRevenueElement = document.getElementById('totalRevenue');
    if (totalRevenueElement) {
        let current = parseFloat(totalRevenueElement.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        current += amount;
        totalRevenueElement.textContent = formatCurrency(current);
    }
    
    // Update pending orders badge
    const orderBadge = document.getElementById('orderBadge');
    if (orderBadge) {
        let current = parseInt(orderBadge.textContent) || 0;
        current += orderCount;
        orderBadge.textContent = current;
    }
}

// Check Admin Authentication
function checkAdminAuth() {
    // For demo purposes only
    // In real application, check if user has admin privileges
    const isAdmin = localStorage.getItem('isAdmin') === 'true' || 
                   (currentUser && currentUser.email && currentUser.email.includes('admin'));
    
    if (!isAdmin && !window.location.pathname.includes('login.html')) {
        showToast('Admin access required. Redirecting...', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

// Add CSS for status badges
const style = document.createElement('style');
style.textContent = `
    .status-badge {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
    }
    
    .status-completed {
        background: rgba(76, 175, 80, 0.1);
        color: #4CAF50;
    }
    
    .status-processing {
        background: rgba(33, 150, 243, 0.1);
        color: #2196F3;
    }
    
    .status-pending {
        background: rgba(255, 152, 0, 0.1);
        color: #FF9800;
    }
    
    .status-failed {
        background: rgba(244, 67, 54, 0.1);
        color: #F44336;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
    }
    
    .form-control {
        width: 100%;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        transition: all 0.3s ease;
    }
    
    .form-control:focus {
        outlin
