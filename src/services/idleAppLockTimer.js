import store from "@/store";
import router from "@/router";

let idleTimeout;
const idleTimeoutDuration = 5 * 60 * 1000;

function resetIdleTimeout() {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(lockApp, idleTimeoutDuration);
}

function lockApp() {
    //set the app as locked
    store.commit('auth/LOCK_APP');
    //redirect to locked app page
    router.push({name: 'app_locked'});
}

function setupIdleListeners() {
    window.addEventListener('mousemove', resetIdleTimeout);
    window.addEventListener('keydown', resetIdleTimeout);
    window.addEventListener('scroll', resetIdleTimeout);
    window.addEventListener('click', resetIdleTimeout);

    // Initialize the idle timeout
    resetIdleTimeout();
}

function startIdleTracking() {
    // Only set up listeners if the user is authenticated
    if (store.getters["auth/isAuthenticated"]) {
        setupIdleListeners();
    }
}

function stopIdleTracking() {
    // Clean up listeners and timeout if needed
    clearTimeout(idleTimeout);
    window.removeEventListener('mousemove', resetIdleTimeout);
    window.removeEventListener('keydown', resetIdleTimeout);
    window.removeEventListener('scroll', resetIdleTimeout);
    window.removeEventListener('click', resetIdleTimeout);
}

export { startIdleTracking, stopIdleTracking };
