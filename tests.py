from __future__ import unicode_literals
import unittest
import screensizer
import os
import settings

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

        self.assertEqual('src="{0}"'.format(screensizer.settings.default_iframe_url) in response.data.decode('utf-8'), True)

        # check ?url=xxx is passed correctly when provided
        url = "http://testurl"
        response = self.app.get('/?url={0}'.format(url), follow_redirects=True)
        
        self.assertIn('src="{0}"'.format(url), response.data.decode('utf-8'))

        # check ?width=xx is passed correctly when provided
        width = 666
        response = self.app.get('/?width={0}'.format(width), follow_redirects=True)
        
        self.assertIn('width="{0}"'.format(width), response.data.decode('utf-8'))

        # check ?height=xx is passed correctly when provided
        height = 999
        response = self.app.get('/?height={0}'.format(height), follow_redirects=True)
        
        self.assertIn('height="{0}"'.format(height), response.data.decode('utf-8'))

        # check with all combined
        response = self.app.get('/?url={0}&width={1}&height={2}'.format(url, width, height), follow_redirects=True)
        
        self.assertIn('src="{0}"'.format(url), response.data.decode('utf-8'))
        self.assertIn('width="{0}"'.format(width), response.data.decode('utf-8'))
        self.assertIn('height="{0}"'.format(height), response.data.decode('utf-8'))


    def test_can_disable_screenshot(self):
        old = settings.screenshot_app
        settings.screenshot_app = None
        response = self.app.get('/screenshot?url=http://example.com&with=1280&height=600', follow_redirects=True)        
        self.assertEqual(response.status_code, 404)
        settings.screenshot_app = old

    def test_can_get_uuid_of_screenshot(self):
        response = self.app.get('/screenshot?url=http://example.com&with=1280&height=600', follow_redirects=True)
        
        self.assertEqual(response.data.decode('utf-8').startswith('{\n  "url"'), True)
        print(response.data.decode('utf-8'))
        


if __name__ == "__main__":     
    unittest.main()