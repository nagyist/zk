/* F86_ZK_4184Test.java

	Purpose:
		
	Description:
		
	History:
		Tue Jan 08 10:40:39 CST 2019, Created by rudyhuang

Copyright (C) 2019 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zktest.zats.test2;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import org.zkoss.lang.Threads;
import org.zkoss.test.webdriver.WebDriverTestCase;
import org.zkoss.test.webdriver.ztl.JQuery;

/**
 * @author rudyhuang
 */
public class F86_ZK_4184Test extends WebDriverTestCase {
	@Test
	public void test() {
		connect();

		// To ensure the background thread is ready
		Threads.sleep(1000);

		testUpdate();
		// Test 4 more times
		for (int i = 0; i < 4; i++) {
			System.out.println(">>>> test -> " + (i + 1));
			closeAuAlert();
			testUpdate();
		}
	}

	private void testUpdate() {
		click(jq("$update"));
		waitResponse();
		Assertions.assertTrue(jq("$aualert").isVisible());
	}

	private void closeAuAlert() {
		JQuery $aualert = jq("$aualert");
		System.out.println(">>>> closeAuAlert is called!");
		if ($aualert.isVisible()) {
			System.out.println(">>>> closeAuAlert: try to close");
			click($aualert.find("@button"));
			waitResponse();
		}
	}
}
