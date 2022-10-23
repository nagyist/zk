/* HugeDataVM.java

		Purpose:
		
		Description:
		
		History:
				Mon May 10 11:58:22 CST 2021, Created by leon

Copyright (C) 2021 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.test.mvvm.book.advance;

import org.zkoss.bind.annotation.Command;
import org.zkoss.zk.ui.util.Clients;

public class HugeDataVM {
	private LivePersonListModel personListModel = new LivePersonListModel(new PersonDao());
	private Person selectedPerson;

	public LivePersonListModel getPersonListModel() {
		return personListModel;
	}

	public void setPersonListModel(LivePersonListModel personListModel) {
		this.personListModel = personListModel;
	}

	public Person getSelectedPerson() {
		return selectedPerson;
	}

	public void setSelectedPerson(Person selectedPerson) {
		this.selectedPerson = selectedPerson;
	}

	@Command
	public void showModelSize() {
		Clients.log(personListModel.getSize());
	}
}
