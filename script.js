// Global Variables
let currentUser = null;
let realtimeData = {
    onlineUsers: 0,
    pendingOrders: 0,
    todayRevenue: 0
};

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainContainer = document.getElementById('main-container');

// Initialize Application
function initializeApp() {
    // Check if user is logged in
    checkAuthState();
    
    // Initialize UI components
    initializeUI();
    
    // Initialize real-time data
    initializeRealtimeData();
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        mainContainer.style.display = 'block';
        
        // Fade in main container
        setTimeout(() => {
            mainContainer.style.opacity = '1';
        }, 100);
    }, 2000);
}

// Check Authentication State
function checkAuthState() {
    // Check if user is logged in (for Firebase)
    if (typeof firebase !== 'undefined') {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                currentUser = user;
                updateUserUI(user);
            } else {
                // Redirect to login if not authenticated
                if (!window.location.pathname.includes('login.html') && 
                    !window.location.pathname.includes('register.html')) {
                    window.location.href = 'login.html';
                }
            }
        });
    } else {
        // For static demo - check localStorage
        const savedUser = localStorage.getItem('smmPanelUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            updateUserUI(currentUser);
        } else if (!window.location.pathname.includes('login.html') && 
                   !window.location.pathname.includes('register.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Update User UI
function updateUserUI(user) {
    const userNameElement = document.getElementById('userName');
    if (userNameElement && user) {
        userNameElement.textContent = user.displayName || user.email || 'Admin';
    }
}

// Initialize UI Components
function initializeUI() {
    // Initialize sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const dashboardContent = document.querySelector('.dashboard-content');
    const footer = document.querySelector('.footer');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            dashboardContent.classList.toggle('expanded');
            footer.classList.toggle('expanded');
        });
    }
    
    // Initialize notification dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationList = document.getElementById('notificationList');
    
    if (notificationBtn && notificationList) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationList.classList.toggle('active');
            
            // Mark notifications as read
            if (notificationList.classList.contains('active')) {
                markNotificationsAsRead();
            }
        });
        
        // Close notification dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationBtn.contains(e.target) && !notificationList.contains(e.target)) {
                notificationList.classList.remove('active');
            }
        });
    }
    
    // Initialize profile dropdown
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('active');
        });
        
        // Close profile dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('active');
            }
        });
    }
    
    // Initialize logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Initialize modal close buttons
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Initialize Real-time Data
function initializeRealtimeData() {
    // Simulate real-time data updates for demo
    setInterval(() => {
        updateRealtimeStats();
    }, 5000);
    
    // Load initial data
    updateRealtimeStats();
}

// Update Real-time Stats
function updateRealtimeStats() {
    // Generate random data for demo
    const newOnlineUsers = Math.floor(Math.random() * 50) + 100;
    const newPendingOrders = Math.floor(Math.random() * 20) + 5;
    const newTodayRevenue = (Math.random() * 500 + 100).toFixed(2);
    
    // Update DOM elements
    const onlineUsersElement = document.getElementById('onlineUsers');
    const pendingOrdersElement = document.getElementById('pendingOrders');
    const todayRevenueElement = document.getElementById('todayRevenue');
    
    if (onlineUsersElement) {
        animateCounter(onlineUsersElement, realtimeData.onlineUsers, newOnlineUsers);
        realtimeData.onlineUsers = newOnlineUsers;
    }
    
    if (pendingOrdersElement) {
        animateCounter(pendingOrdersElement, realtimeData.pendingOrders, newPendingOrders);
        realtimeData.pendingOrders = newPendingOrders;
    }
    
    if (todayRevenueElement) {
        animateCounter(todayRevenueElement, parseFloat(realtimeData.todayRevenue), 
                      parseFloat(newTodayRevenue), true);
        realtimeData.todayRevenue = newTodayRevenue;
    }
}

// Animate Counter
function animateCounter(element, oldValue, newValue, isCurrency = false) {
    const duration = 1000; // 1 second
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = (newValue - oldValue) / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        const currentValue = oldValue + (increment * currentStep);
        
        if (currentStep >= steps) {
            element.textContent = isCurrency ? `$${newValue.toFixed(2)}` : Math.round(newValue);
            clearInterval(timer);
        } else {
            element.textContent = isCurrency ? 
                `$${currentValue.toFixed(2)}` : Math.round(currentValue);
        }
    }, stepDuration);
}

// Handle Logout
function handleLogout(e) {
    e.preventDefault();
    
    // Show confirmation dialog
    if (confirm('Are you sure you want to logout?')) {
        if (typeof firebase !== 'undefined') {
            // Firebase logout
            firebase.auth().signOut().then(() => {
                window.location.href = 'login.html';
            }).catch((error) => {
                showToast('Error logging out: ' + error.message, 'error');
            });
        } else {
            // Static demo logout
            localStorage.removeItem('smmPanelUser');
            window.location.href = 'login.html';
        }
    }
}

// Show Toast Notification
function showToast(message, type = 'info', duration = 5000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toastId = 'toast-' + Date.now();
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.id = toastId;
    
    toast.innerHTML = `
        <i class="toast-icon ${icons[type] || icons.info}"></i>
        <div class="toast-content">
            <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="removeToast('${toastId}')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        removeToast(toastId);
    }, duration);
}

// Remove Toast
function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
}

// Add Activity to Feed
function addActivityToFeed(activityText) {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;
    
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    const colors = ['#4361ee', '#3a0ca3', '#4cc9f0', '#f8961e', '#f94144'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    activityItem.innerHTML = `
        <div class="activity-icon" style="background: ${randomColor}">
            <i class="fas fa-bolt"></i>
        </div>
        <div class="activity-content">
            <p>${activityText}</p>
            <div class="activity-time">${timeString}</div>
        </div>
    `;
    
    // Add to top of feed
    if (activityFeed.firstChild) {
        activityFeed.insertBefore(activityItem, activityFeed.firstChild);
    } else {
        activityFeed.appendChild(activityItem);
    }
    
    // Limit to 10 items
    const items = activityFeed.querySelectorAll('.activity-item');
    if (items.length > 10) {
        items[items.length - 1].remove();
    }
}

// Mark Notifications as Read
function markNotificationsAsRead() {
    const notificationCount = document.getElementById('notificationCount');
    if (notificationCount) {
        notificationCount.textContent = '0';
        notificationCount.style.display = 'none';
    }
}

// Format Currency
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Generate Random ID
function generateId(prefix = '') {
    return prefix + Date.now() + Math.random().toString(36).substr(2, 9);
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        formatCurrency,
        formatDate,
        generateId
    };
}
