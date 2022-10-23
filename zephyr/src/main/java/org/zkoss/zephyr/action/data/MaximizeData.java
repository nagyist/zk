/* MaximizeData.java

	Purpose:

	Description:

	History:
		5:52 PM 2022/3/2, Created by jumperchen

Copyright (C) 2022 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.action.data;

/**
 * Represents an action caused by a component being maximized.
 * @author jumperchen
 */
public class MaximizeData implements ActionData {
	private String width, height, left, top;
	private boolean maximized;

	/** Returns the width of the component, which is its original width.
	 */
	public final String getWidth() {
		return width;
	}

	/** Returns the height of the component, which is its original height.
	 */
	public final String getHeight() {
		return height;
	}

	/** Returns the left of the component, which is its original left.
	 */
	public final String getLeft() {
		return left;
	}

	/** Returns the top of the component, which is its original top.
	 */
	public final String getTop() {
		return top;
	}

	/** Returns whether to be maximized.
	 */
	public final boolean isMaximized() {
		return maximized;
	}
}
