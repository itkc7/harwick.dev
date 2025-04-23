import subprocess
import datetime

# Configuration
username = "YOUR_LASTFM_USERNAME"
size = "3"
time_period = "7d"
output_dir = "generated_charts"
custom_file_name = "weekly_chart.jpg"  # Static filename

# Generate chart using the CLI command
subprocess.run([
    "tpmsc",
    username,
    output_dir,
    size,
    time_period
])

print(f"Weekly chart generated: {datetime.datetime.now()}")
