import unittest
import screensizer
import os


class ScreenSizerTestCase(unittest.TestCase):

    def setUp(self):
        screensizer.app.config['TESTING'] = True
        self.app = screensizer.app.test_client()

    def test_index_without_locale_redirect_to_default_locale(self):
        response = self.app.get('/')
        self.assertEqual(response.location, "http://" + screensizer.settings.hostname + "/" + screensizer.settings.default_locale)

    def test_get_parameters_passed_to_template(self):

        # check default iframe url is used correctly when ?url=xxx not provided
        response = self.app.get('/', follow_redirects=True)
        
        self.assertIn('src="{0}"'.format(screensizer.settings.default_iframe_url), response.data)

        # check ?url=xxx is passed correctly when provided
        url = "http://testurl"
        response = self.app.get('/?url={0}'.format(url), follow_redirects=True)
        
        self.assertIn('src="{0}"'.format(url), response.data)

        # check ?width=xx is passed correctly when provided
        width = 666
        response = self.app.get('/?width={0}'.format(width), follow_redirects=True)
        
        self.assertIn('width="{0}"'.format(width), response.data)

        # check ?height=xx is passed correctly when provided
        height = 999
        response = self.app.get('/?height={0}'.format(height), follow_redirects=True)
        
        self.assertIn('height="{0}"'.format(height), response.data)

        # check with all combined
        response = self.app.get('/?url={0}&width={1}&height={2}'.format(url, width, height), follow_redirects=True)
        
        self.assertIn('src="{0}"'.format(url), response.data)
        self.assertIn('width="{0}"'.format(width), response.data)
        self.assertIn('height="{0}"'.format(height), response.data)


if __name__ == "__main__":     
    unittest.main()