/* B96_ZK_4817Test.java

	Purpose:
		
	Description:
		
	History:
		Wed Mar 31 14:53:15 CST 2021, Created by rudyhuang

Copyright (C) 2021 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zktest.zats.test2;

import java.util.Collections;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.touch.TouchActions;

import org.zkoss.test.webdriver.WebDriverTestCase;
import org.zkoss.test.webdriver.ztl.Widget;

/**
 * @author rudyhuang
 */
public class B96_ZK_4817Test extends WebDriverTestCase {
	@Override
	protected ChromeOptions getWebDriverOptions() {
		return super.getWebDriverOptions()
				.setExperimentalOption("mobileEmulation", Collections.singletonMap("deviceName", "iPad"))
				.setExperimentalOption("w3c", false); // Temporary workaround for TouchAction
	}

	@Test
	public void test() {
		connect();

		final Widget listgroup = widget("@listgroup");
		new TouchActions(driver)
				.singleTap(toElement(listgroup.$n("img")))
				.perform();
		waitResponse();
		Assertions.assertFalse(jq(listgroup).hasClass("z-listgroup-selected"));
		Assertions.assertTrue(jq(listgroup).hasClass("z-listgroup-open"));

		final Widget group = widget("@group");
		new TouchActions(driver)
				.singleTap(toElement(group.$n("img")))
				.perform();
		waitResponse();
		Assertions.assertTrue(jq(group).hasClass("z-group-open"));

		final Widget detail = widget("@detail");
		new TouchActions(driver)
				.singleTap(toElement(detail.$n("icon")))
				.perform();
		waitResponse();
		Assertions.assertTrue(jq(detail.$n("chdextr")).hasClass("z-detail-open"));
	}
}