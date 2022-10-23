/* B90_ZK_4556Test.java

		Purpose:
		
		Description:
		
		History:
			Mon Apr 27 12:46:50 CST 2020, Created by jameschu

Copyright (C) 2020 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.webdriver.test2;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import org.zkoss.zephyr.webdriver.ZephyrClientMVVMTestCase;
import org.zkoss.test.webdriver.ztl.JQuery;

/**
 * @author jameschu
 */
public class B90_ZK_4556Test extends ZephyrClientMVVMTestCase {
	@Test
	public void testNodom() {
		connect("/test2/B90-ZK-4556-1.zul");
		click(jq("@button"));
		waitResponse();
		JQuery jqBtn = jq("@button");
		assertEquals(jqBtn.eq(1).outerWidth() * 2, jqBtn.eq(2).outerWidth(), 2);
	}
}
