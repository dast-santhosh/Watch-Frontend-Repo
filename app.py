import streamlit as st
import random
import time

# Function to generate random emotion data
def generate_random_parameters():
    """Generates a dictionary with random emotion and state parameters."""
    return {
        "Stress": random.randint(0, 100),
        "Fear": random.randint(0, 100),
        "Anxious": random.randint(0, 100),
        "Surprise": random.randint(0, 100),
    }

# --- Streamlit Application ---

st.set_page_config(
    page_title="Emotion and State Reader",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="auto"
)

st.markdown("""
<style>
    /* Custom button styling for a more app-like feel */
    .stButton>button {
        background-color: #0078D7;
        color: white;
        border: none;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
        width: 100%;
    }
    .stButton>button:hover {
        background-color: #005A9E;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    
    /* Overall container and card styling */
    .metric-card {
        background-color: #f0f2f6;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        width: 100%;
        text-align: center;
    }
    
    /* Style for the fixed copyright taskbar at the bottom */
    .copyright-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #333;
        color: white;
        text-align: center;
        padding: 10px;
        font-size: 12px;
    }
    
    /* Overwrite Streamlit's default container padding for a full-width feel */
    .main .block-container {
        padding-top: 2rem;
        padding-right: 2rem;
        padding-left: 2rem;
        padding-bottom: 3rem; /* Add space for the copyright bar */
    }
    
    .st-emotion-cache-1gsv4e8 {
        border-radius: 15px;
    }
</style>
""", unsafe_allow_html=True)

st.title("Emotion and State Reader 🧠")
st.markdown("Connect to your device to view real-time emotion and state data.")

# Initialize session state variables
if "device_selected" not in st.session_state:
    st.session_state.device_selected = False
if "authenticated" not in st.session_state:
    st.session_state.authenticated = False
if "password_tried" not in st.session_state:
    st.session_state.password_tried = False
if "loading_devices" not in st.session_state:
    st.session_state.loading_devices = False
if "current_device_name" not in st.session_state:
    st.session_state.current_device_name = None

# --- Device Selection UI ---
if not st.session_state.authenticated:
    st.subheader("Connect to a Device")
    
    # Button to show device selection
    if st.button("Select your Device"):
        st.session_state.loading_devices = True
        st.session_state.device_selected = False
        st.session_state.password_tried = False

    if st.session_state.loading_devices:
        with st.spinner("Loading devices..."):
            time.sleep(5)  # Simulate 5-6 second delay
        st.session_state.loading_devices = False
        st.session_state.device_selected = True
        st.rerun()

    if st.session_state.device_selected:
        # Dropdown for device selection
        devices = {
            "Watch": "192.0.0.17",
            "Card": "168.0.0.12"
        }
        
        # Capture the selected device
        selected_device = st.selectbox(
            "Choose your device:",
            options=list(devices.keys())
        )
        st.session_state.current_device_name = selected_device
        
        # Display password input after a device is selected
        if st.session_state.current_device_name:
            st.info(f"Connecting to {st.session_state.current_device_name} at IP: {devices[st.session_state.current_device_name]}")
            
            password = st.text_input("Enter password:", type="password")
            
            if st.button("Connect"):
                st.session_state.password_tried = True
                if password == "Root":
                    st.session_state.authenticated = True
                    st.success("Connection successful!")
                    st.balloons()
                else:
                    st.error("Incorrect password. Please try again.")

# --- Main App Content (after authentication) ---
if st.session_state.authenticated:
    st.subheader("Live Emotion and State Data")
    
    col1, col2 = st.columns(2)
    col3, col4 = st.columns(2)
    
    stress_card = col1.empty()
    fear_card = col2.empty()
    anxious_card = col3.empty()
    surprise_card = col4.empty()

    def update_metrics():
        with st.spinner("Reading data..."):
            time.sleep(30)
            parameters = generate_random_parameters()
            
            with stress_card:
                st.metric(label="Stress", value=f"{parameters['Stress']}%")
            with fear_card:
                st.metric(label="Fear", value=f"{parameters['Fear']}%")
            with anxious_card:
                st.metric(label="Anxious", value=f"{parameters['Anxious']}%")
            with surprise_card:
                st.metric(label="Surprise", value=f"{parameters['Surprise']}%")
    
    if st.button("Read Emotion and State"):
        update_metrics()
    
    if not st.session_state.get('initial_load_complete', False):
        update_metrics()
        st.session_state.initial_load_complete = True

# --- Copyright Taskbar ---
st.markdown("""
<div class="copyright-bar">
    © 2023 Emotion and State Reader. All Rights Reserved.
</div>
""", unsafe_allow_html=True)
