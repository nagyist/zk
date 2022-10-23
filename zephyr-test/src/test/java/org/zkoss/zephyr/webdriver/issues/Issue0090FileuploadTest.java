/* Issue0090FileuploadTest.java

	Purpose:
		
	Description:
		
	History:
		3:19 PM 2022/1/13, Created by jumperchen

Copyright (C) 2022 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.webdriver.issues;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import org.zkoss.test.webdriver.WebDriverTestCase;

/**
 * @author jumperchen
 */
public class Issue0090FileuploadTest extends WebDriverTestCase {
	@Test
	public void testFileupload() {
		connect("/issue0090");
		sendKeys(jq("input[type=file]"), System.getProperty("user.dir") + "/src/main/webapp/zephyr/ZK-Logo.gif");
		waitResponse();
		assertEquals("ZK-Logo.gif", jq("$msg").text());

		// try again for non-desktop case
		sendKeys(jq("input[type=file]"), System.getProperty("user.dir") + "/src/main/webapp/zephyr/video.zpr");
		waitResponse();
		assertEquals("video.zpr", jq("$msg").text());
	}
}
