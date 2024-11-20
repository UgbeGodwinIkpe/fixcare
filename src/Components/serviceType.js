// Object mapping service type to the type of requiremenmts 
const serviceType = {
    "Electrical": ["Switchbox Installation (Any type)", "Switchboard Repairing", "Switch & Socket Repairing", 
        "Fan (Ceiling/Standing/Wall) Installation, Repairing", "Lights Installation wall, ceiling, (Any type)", 
        "MCB Installation, Meter Installation, Circuit Repairing", "Power House Maintenance & Servicing", "Inverter Installation & Servicing", "Wiring (Upto 50m) Internal, Casing (Shot Repair & New Installing)", 
        "Unlimited Drill Holes", "Appliances Repairing & Installation", "Iron, Heater, Geyser, Fancy Lights, Lamps, Door Bell, Water Pump, Projector, RO Chimney, Air Cooler"
    ], 
    "Plumbing Maintenance": ["Leakage Repairing", "Washbasin Installation & Repairing", "Waste Pipe Installation", 
        "Waste Pipe Installation", "Bathroom Accessories Installation/Repairing", "Bath Fitting Installation", 
        "Water Pipe Blockage Repairing", "Drainage Pipe Installations/Repairing", "Commode Installations/Part Changing", 
        "Tap Installation & Repair (Any type)", "Toilet Seat Accessories Replacement (Any type)", 
        "Water Tank Installation/Leakage Repair", "Water Motor Servvicing/Installation/Changing", "Any Kind of Product Installation or servicing or maintenance"
    ], 
    "Computer System Maintenance online support": ["Locating and removing viruses and other malicious software from the system", "Tuning up a personal computer, helping it to start and function much faster", "Configuring & repairing email access clients, such as outlook, and their associated data files", 
        "Configuring external devices such as printers, scanners and external storage drives", "Performing standard routine maintenance such as examining system logs for issues", "Assisting in data backup processes and migrating data between multiple computers in a network", 
        "Checking network connections for possible vulnerabilities", "Resolving various software and hardware conflicts", "Assisting in the installation and upgrading of various software packages", "Repairing errors that cause a computer to lock or freeze up", "Setting up secure wireless networks once the proper equipment connections are in place"],
    "Computer System Maintenance offline support": ["Computer or Desktop deployment, relocation and setup", "Virus and spyware removal & malicious software prevention", "Hardware Installations, & upgrading memeory, hard drives, SSD's video cards, disc drives etc.", 
        "Computer peripheral installation, configuration and networking, including printers", "Network design and configuration", "Software installation & upgrades, such as operating system & database applications", 
        "Troubleshooting & repairing of internet access connection issues", "Router and firewall installation configuration, & troubleshooting", "Email and messaging configuration and support", 
        "Data backup & recovery solutions", "Password recovery services", 
    ], 
    "Carpenter Services": ["Curtain & Blinds Installation/Repairing", "Doors & Window installation/Repairing", "Locks & handle Installation/Replacement", 
        "All kinds of Drawer & Shelf Repairing", "Furniture Installation & Repairing", "Furniture Assembling (Any type)", "Furniture Dismantle", 
        "Any type of accessories, product replacement/repairing/installation", "Custom Building of any product", "Sunmica Sheet Replacement/Installation", 
        "Plywood/Blockboard Installation", "Any kind of repairing as per carpenter related tasks"], 
    "Cleaning Solutions": ["Washroom Cleaning", "Area Cleaning [Indoors & Outdoors]", "Water Tank Cleaning", "Appliances Cleaning","Glasses Cleaning", "Pantry Cleaning", 
        "Appliances Cleaning", "Furniture Cleaning", "Keeping up to date everything which can be maintained by cleaning and keeping good hygiene of the premises", 
    ], 
    "Premises Review": ["Premises review by Facility Management Manger", "Helping to change parts or and to make decisions about condition of premises maintenance status", 
        "Drafting reports and share it with the owner or any representative other of the premises", "Advising or increasing efficiency and cost effectiveness",
        "Supervising multi-disciplinary services team that service as per standard of the premises", "Ensuring that facilities such as electrical, plumbing, computers, and others are well maintained or not, if not then give consulting about to make changes", 
        "Review of premises is just like you do your health checkups, its check-up of your premises maintenance condition"], 
}; 

// Exporting the type of service 
export default serviceType; 