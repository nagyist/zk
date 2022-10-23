/* ActionHandler9.java

	Purpose:
		
	Description:
		
	History:
		11:17 AM 2021/10/5, Created by jumperchen

Copyright (C) 2021 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.util;

import org.zkoss.zephyr.function.CheckedConsumer9;

/**
 * Represents an action handler with nine arguments.
 * @author jumperchen
 */
@FunctionalInterface
public interface ActionHandler9<A, B, C, D, E, F, G, H, I> extends
		CheckedConsumer9<A, B, C, D, E, F, G, H, I>, ActionHandler {
	default int getParameterCount() {
		return 9;
	}
}