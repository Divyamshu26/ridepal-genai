# utils/geo.py

from geopy.distance import geodesic

def calculate_distance(loc1, loc2):
    # Mock coordinates for simplicity (replace with real API later)
    locations = {
        "Ameerpet": (17.4375, 78.4483),
        "Madhapur": (17.4447, 78.3915),
        "Gachibowli": (17.4436, 78.3498),
        "Hitech City": (17.4504, 78.3820),
        "Secunderabad": (17.4399, 78.4983),
        "Kondapur": (17.4700, 78.3600),
        "LB Nagar": (17.3515, 78.5261),
        "Banjara Hills": (17.4239, 78.4482),
        "Kukatpally": (17.4931, 78.3992),
    }
    return geodesic(locations[loc1], locations[loc2]).km
def get_location_coordinates(location):
    # Mock coordinates for simplicity (replace with real API later)
    locations = {
        "Ameerpet": (17.4375, 78.4483),
        "Madhapur": (17.4447, 78.3915),
        "Gachibowli": (17.4436, 78.3498),
        "Hitech City": (17.4504, 78.3820),
        "Secunderabad": (17.4399, 78.4983),
        "Kondapur": (17.4700, 78.3600),
        "LB Nagar": (17.3515, 78.5261),
        "Banjara Hills": (17.4239, 78.4482),
        "Kukatpally": (17.4931, 78.3992),
    }
    return locations.get(location, None)