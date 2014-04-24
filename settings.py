
# default sizes available
# Default resolutions come from http://en.wikipedia.org/wiki/List_of_common_resolutions
# size categories
desktop = (
    "Desktop",
    [
        # (label, icon, width, height)
        ('10" Netbook', "", 1024, 600),
        ('12" Netbook', "", 1024, 768),
        ('13" Netbook', "", 1280, 800),
        ('15" Netbook', "", 1366, 768),
        ('19" Desktop', "", 1440, 900),
        ('20" Desktop', "", 1600, 900),
        ('22" Desktop', "", 1680, 1050),
        ('23" Desktop', "", 1920, 1080),
        ('24" Desktop', "", 1920, 1200),
    ]
)


tablet = (
    "Tablet",
    [
        # (label, icon, width, height)
        ("Apple iPad", "", 1024, 768),
        ("Label", "", 500, 500)
    ]
)

mobile = (
    "Mobile",
    [
        # (label, icon, width, height)
        ("Apple iPod Nano 5G", "", 376, 240),
        ("Label", "", 350, 600)
    ]
)

sizes = [
    desktop,
    tablet,
    mobile
]

default_size = (1024, 600)

title = "Screen sizer"
slogan = "Test your website under various screen resolutions"