/* Textbox.ts

	Purpose:

	Description:

	History:
		Sat Dec 13 23:30:38     2008, Created by tomyeh

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 2.1 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
/**
 * A textbox.
 * <p>Default {@link #getZclass}: z-textbox.
 */
@zk.WrapClass('zul.inp.Textbox')
export class Textbox extends zul.inp.InputWidget<string> {
	override _value = '';
	_rows = 1;
	_submitByEnter?: boolean;

	/** Returns whether it is multiline.
	 * <p>Default: false.
	 * @return boolean
	 */
	override isMultiline(): boolean {
		return !!this._multiline;
	}

	/** Sets whether it is multiline.
	 * @param boolean multiline
	 */
	setMultiline(multiline: boolean, opts?: Record<string, boolean>): this {
		const o = this._multiline;
		this._multiline = multiline;

		if (o !== multiline || (opts && opts.force)) {
			this.rerender();
		}

		return this;
	}

	/** Returns whether TAB is allowed.
	 * If true, the user can enter TAB in the textbox, rather than change
	 * focus.
	 * <p>Default: false.
	 * @return boolean
	 */
	isTabbable(): boolean {
		return !!this._tabbable;
	}

	/** Sets whether TAB is allowed.
	 * If true, the user can enter TAB in the textbox, rather than change
	 * focus.
	 * <p>Default: false.
	 * @param boolean tabbable
	 */
	setTabbable(tabbable: boolean): this {
		this._tabbable = tabbable;
		return this;
	}

	/** Returns the rows.
	 * <p>Default: 1.
	 * @return int
	 */
	getRows(): number {
		return this._rows;
	}

	/** Sets the rows.
	 * @param int rows
	 */
	setRows(rows: number, opts?: Record<string, boolean>): this {
		const o = this._rows;
		this._rows = rows;

		if (o !== rows || (opts && opts.force)) {
			interface ZULInputElement extends HTMLInputElement {
				rows: number;
			}
			// FIXME: grid?
			var inp = this.getInputNode() as ZULInputElement | undefined;
			if (inp && this.isMultiline())
				inp.rows = rows;
		}

		return this;
	}

	/** Returns the type.
	 * <p>Default: text.
	 * @return String
	 */
	override getType(): string {
		return this._type;
	}

	/** Sets the type.
	 * @param String type the type. Acceptable values are "text" and "password".
	 * Unlike XUL, "timed" is redudant because it is enabled as long as
	 * onChanging is added.
	 */
	setType(type: string, opts?: Record<string, boolean>): this {
		const o = this._type;
		this._type = type;

		if (o !== type || (opts && opts.force)) {
			var inp = this.getInputNode();
			if (inp)
				inp.type = type;
		}

		return this;
	}

	/** Returns whether it is submitByEnter.
	 * <p>Default: false.
	 * @return boolean
	 */
	isSubmitByEnter(): boolean {
		return !!this._submitByEnter;
	}

	/** Sets whether it is submitByEnter.
	 * @param boolean submitByEnter
	 */
	setSubmitByEnter(submitByEnter: boolean): this {
		this._submitByEnter = submitByEnter;
		return this;
	}

	//super//
	override textAttrs_(): string {
		var html = super.textAttrs_();
		if (this._multiline)
			html += ' rows="' + this._rows + '"';
		return html;
	}

	override doKeyDown_(evt: zk.Event): void {
		if (evt.keyCode == 13 && this._submitByEnter && this._multiline && !evt.shiftKey) {
			evt.stop();
			this.fire('onOK');
		}
		super.doKeyDown_(evt);
	}
}