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
    layout="centered",
    initial_sidebar_state="auto"
)

st.markdown("""
<style>
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        transition: all 0.3s ease;
    }
    .stButton>button:hover {
        background-color: #45a049;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 20px;
    }
    .metric-card {
        background-color: #f0f2f6;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        width: 100%;
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

# --- Device Selection UI ---
if not st.session_state.authenticated:
    st.subheader("Connect to a Device")
    
    # Button to show device selection
    if st.button("Select your Device"):
        st.session_state.device_selected = True
        st.session_state.password_tried = False
    
    if st.session_state.device_selected:
        # Dropdown for device selection
        devices = {
            "Watch": "192.0.0.17",
            "Card": "168.0.0.12"
        }
        device_name = st.selectbox(
            "Choose your device:",
            options=list(devices.keys())
        )
        st.info(f"Connecting to {device_name} at IP: {devices[device_name]}")
        
        # Password input
        password = st.text_input("Enter password:", type="password")
        
        # Check password
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
    
    # Create empty containers for metrics
    col1, col2 = st.columns(2)
    col3, col4 = st.columns(2)
    
    stress_card = col1.empty()
    fear_card = col2.empty()
    anxious_card = col3.empty()
    surprise_card = col4.empty()

    # Function to update the metric cards
    def update_metrics():
        with st.spinner("Reading data..."):
            time.sleep(1) # Simulate a delay
            parameters = generate_random_parameters()
            
            with stress_card:
                st.metric(label="Stress", value=f"{parameters['Stress']}%")
            with fear_card:
                st.metric(label="Fear", value=f"{parameters['Fear']}%")
            with anxious_card:
                st.metric(label="Anxious", value=f"{parameters['Anxious']}%")
            with surprise_card:
                st.metric(label="Surprise", value=f"{parameters['Surprise']}%")
    
    # Button to trigger data update
    if st.button("Read Emotion and State"):
        update_metrics()
    
    # Initial data load
    if not st.session_state.get('initial_load_complete', False):
        update_metrics()
        st.session_state.initial_load_complete = True
