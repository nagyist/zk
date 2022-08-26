/* F65_ZK_2061Test.java

	Purpose:
		
	Description:
		
	History:
		Tue Apr 16 18:33:18 CST 2019, Created by rudyhuang

Copyright (C) 2019 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zktest.zats.test2;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import org.zkoss.test.webdriver.WebDriverTestCase;

/**
 * @author rudyhuang
 */
public class F65_ZK_2061Test extends WebDriverTestCase {
	@Test
	public void test() {
		connect();

		waitResponse();
		Assertions.assertFalse(isZKLogAvailable());
	}
}
