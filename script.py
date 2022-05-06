from xvfbwrapper import Xvfb
from selenium import webdriver
from selenium.webdriver.common.by import By
import selenium.webdriver.support.ui as ui

import os
import sys
import time
from selenium.webdriver.chrome.options import Options

def check_for_extn_installation(driver, name):  #generates a screenshot to check for extension installation
    driver.get("https://chrome.google.com/webstore/detail/ghostery-%E2%80%93-privacy-ad-blo/mlomiejdfkolichcflejclcbmpeaniij?hl=en")
    #save screenshot
    S = lambda X: driver.execute_script('return document.body.parentNode.scroll'+X)
    driver.set_window_size(S('Width'),S('Height')) # May need manual adjustment
    file_name = name + '.png'
    driver.find_element(by=By.TAG_NAME, value='body').screenshot(file_name)

def extension_add(opts, extn): #adds extension
    opts.add_extension(extn)
    return opts

def dwn_path_add(opts, pth): #adds download path to download fingerprints
    prefs = {"download.default_directory" : pth}
    opts.add_experimental_option("prefs",prefs)

xf = Xvfb()  #  xf = Xvfb(1920, 1080) - will create virtual display with 1920x1080 size
xf.start()
# browser won't appear

extn_lst = ['', 'ghostery', 'https', 'disconnect', 'user_agent', 'privacy_badger', 'adblock', 'ublock', 'cydec', 'canvas_antifp']

for i in extn_lst:
    options = Options()

    cwd = os.getcwd() #assuming that the script is run inside the repo
    pth = cwd+'/extensions/extn_crx/'
    pth = pth + i + '.crx'
    #pth = '/home/ritik/pes/ghostery.zip'
    print("###########################")
    
    if i != '':
        options = extension_add(options, pth)

    driver = webdriver.Chrome(options=options)
    time.sleep(5)
    #check_for_extn_installation(driver, i)


    driver.get("https://coveryourtracks.eff.org/")
    wait = ui.WebDriverWait(driver, 60, 40)

    initial_html = driver.page_source

    element = driver.find_element(By.ID, "kcarterlink")
    element.click()
    wait.until(lambda driver: driver.find_element(By.ID, "results"))
    driver2 = driver
    driver3 = driver
    driver4 = driver
    #fp = driver.execute_script("return $('#fp_status')")
    fp = driver.find_element(By.ID, "fp_status")
    tracker = driver2.find_element(By.ID, "tracker_status")
    ad = driver3.find_element(By.ID, "ad_status")
    
    try:
        fp_entropy = driver4.find_element(by=By.CLASS_NAME, value="entropy")
        print("entropy?", fp_entropy.text)
    except:
        print("XXXXXXXXXX")
        print("entropy not present")
    print("fingerprint? ", fp.text)
    #print("fingerprint_text?", fp.get_attribute('innerHTML'))
    print("tracking_blocked? ", tracker.text)
    print("ad_blocked? ", ad.text)

    driver.quit()
