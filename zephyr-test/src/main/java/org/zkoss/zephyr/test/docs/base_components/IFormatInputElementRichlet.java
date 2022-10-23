/* IFormatInputElementRichlet.java

	Purpose:

	Description:

	History:
		Wed Feb 23 17:44:03 CST 2022, Created by katherine

Copyright (C) 2022 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.test.docs.base_components;

import java.time.LocalDate;
import java.time.LocalTime;

import org.zkoss.zephyr.annotation.RichletMapping;
import org.zkoss.zephyr.ui.StatelessRichlet;
import org.zkoss.zephyr.zpr.IComponent;
import org.zkoss.zephyr.zpr.IDatebox;
import org.zkoss.zephyr.zpr.IDecimalbox;
import org.zkoss.zephyr.zpr.IDoublebox;
import org.zkoss.zephyr.zpr.IDoublespinner;
import org.zkoss.zephyr.zpr.IIntbox;
import org.zkoss.zephyr.zpr.ILongbox;
import org.zkoss.zephyr.zpr.ISpinner;
import org.zkoss.zephyr.zpr.ITimebox;
import org.zkoss.zephyr.zpr.IVlayout;

/**
 * A set of example for {@link org.zkoss.zephyr.zpr.IFormatInputElement} Java Docs.
 * And also refers to something else on <a href="https://www.zkoss.org/wiki/ZK_Component_Reference/Base_Components/FormatInputElement">IFormatInputElement</a>,
 * if any.
 *
 * @author katherine
 * @see org.zkoss.zephyr.zpr.IFormatInputElement
 */
@RichletMapping("/base_components/iFormatInputElement")
public class IFormatInputElementRichlet implements StatelessRichlet {

	@RichletMapping("/format")
	public IComponent format() {
		return IVlayout.of(
				IDatebox.of(LocalDate.of(2000, 1, 1)).withFormat("dd/MMM yyyy").withLocale("en_US"),
				IDecimalbox.of("12345").withFormat("@ #,##0.00"),
				IDoublebox.of(12.3).withFormat("#,##0.00"),
				IDoublespinner.of(1234.567).withFormat("00,000.00"),
				IIntbox.of(1234567).withFormat("#,##0 'XYZ'"),
				ILongbox.of(99999).withFormat("00,000.0"),
				ISpinner.of(1).withFormat("#00"),
				ITimebox.of(LocalTime.of(1, 1)).withFormat("a hh:mm:ss").withLocale("en_US")
		);
	}
}