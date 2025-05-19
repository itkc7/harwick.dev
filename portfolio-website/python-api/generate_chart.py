import requests
from PIL import Image, ImageDraw, ImageFont
import textwrap
import os


def get_weekly_top_albums(api_key, username, limit=9):
    """Fetch weekly top albums from Last.fm API"""
    url = f"http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user={username}&api_key={api_key}&format=json"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Extract top albums (up to the specified limit)
        albums = data['weeklyalbumchart']['album'][:limit]
        return albums
    except Exception as e:
        print(f"Error fetching data from Last.fm: {e}")
        return None


def create_3x3_chart(albums, output_path="weekly_albums_chart.png"):
    """Create a 3x3 grid image of album covers"""
    if len(albums) < 9:
        print("Warning: Less than 9 albums found. Chart will have empty spaces.")

    # Create a blank image (900x900 for 3x3 300px squares)
    img_size = 900
    img = Image.new('RGB', (img_size, img_size), color='white')
    draw = ImageDraw.Draw(img)

    # Load a font
    try:
        font = ImageFont.truetype("arial.ttf", 16)
    except:
        font = ImageFont.load_default()

    # Process each album
    for i, album in enumerate(albums[:9]):  # Only process up to 9 albums
        try:
            # Get album art (using the largest available)
            image_url = None
            for size in ['extralarge', 'large', 'medium', 'small']:
                if f'image_{size}' in album and album[f'image_{size}']:
                    image_url = album[f'image_{size}']
                    break

            if image_url:
                # Download album art
                album_img_data = requests.get(image_url, stream=True).raw
                album_img = Image.open(album_img_data).convert('RGB')

                # Resize to 300x300
                album_img = album_img.resize((300, 300))
            else:
                # Create placeholder if no image found
                album_img = Image.new('RGB', (300, 300), color='lightgray')
                d = ImageDraw.Draw(album_img)
                wrapped_text = textwrap.fill(
                    f"{album['name']}\nby {album['artist']['#text']}", width=20)
                d.text((10, 10), wrapped_text, fill='black', font=font)

            # Calculate position in grid
            row = i // 3
            col = i % 3
            x = col * 300
            y = row * 300

            # Paste album art into grid
            img.paste(album_img, (x, y))

        except Exception as e:
            print(
                f"Error processing album {album.get('name', 'Unknown')}: {e}")
            continue

    # Save the final image
    img.save(output_path)
    print(f"Chart saved as {output_path}")
    return output_path


def main():
    # Get your Last.fm API key and username
    api_key = input("Enter your Last.fm API key: ")
    username = input("Enter your Last.fm username: ")

    # Fetch weekly top albums
    albums = get_weekly_top_albums(api_key, username)

    if albums:
        # Create and save the chart
        output_path = create_3x3_chart(albums)

        # Try to open the image (works on some systems)
        try:
            if os.name == 'nt':  # Windows
                os.startfile(output_path)
            else:  # macOS and Linux
                opener = 'open' if sys.platform == 'darwin' else 'xdg-open'
                subprocess.call([opener, output_path])
        except:
            print(f"Chart created at {output_path}")


if __name__ == "__main__":
    main()
