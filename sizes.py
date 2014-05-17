from flask.ext.babel import gettext as _

# default sizes available
# Default resolutions come from http://en.wikipedia.org/wiki/List_of_common_resolutions
# size categories

# icons are not supported yet
desktop = (
    _("Desktop"),
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
    _("Tablet"),
    [
        # (label, icon, width, height)
        ('Kindle Fire HD 7"', "", 533, 853),
        ("Kindle Fire", "", 600, 800),
        ("Samsung Galaxy Tab", "", 600, 1024),
        ("Google Nexus 7", "", 603, 966),
        ("Apple iPad 1-3/Mini", "", 768, 1024),
        ('Kindle Fire HD 8.9"', "", 800, 1280),

    ]
)
     
mobile = (
    _("Mobile"),
    [
        # (label, icon, width, height)
        ("Motorola RAZR V3m", "", 176, 220),
        ("Motorola RAZR V8", "", 240, 320),
        ("BlackBerry", "", 320, 240),
        ("Apple iPhone 3&amp;4", "", 320, 480),
        ("Samsung Galaxin SII", "", 320, 533),
        ("Apple iPhone 5", "", 320, 568),
        ("Samsung Galaxy S3/4", "", 360, 640),
    ]
)

television = (
    _("TV"),
    [
        # (label, icon, width, height)
        ("480p Television", "", 640, 480),
        ("720p Television", "", 1280, 720),
        ("1080p Television", "", 1920, 1080),
    ]
)

sizes = [
    desktop,
    tablet,
    mobile,
    television
]