/* BarcodescannerTest.java

	Purpose:
		
	Description:
		
	History:
		Tue Jun 23 09:45:01 CST 2020, Created by jameschu

Copyright (C) 2020 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zktest.zats.wcag;

import org.junit.jupiter.api.Test;

/**
 * @author jameschu
 */
public class BarcodescannerTest extends WcagTestCase {
	@Test
	public void test() {
		connect();
		verifyA11y();
	}
}
