/* global describe beforeEach it */

import React from 'react'
import { expect } from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserDashboard } from './user-dashboard'
import ReceiverAdd from './receiver-add'
import ReceiverList from './receiver-add'
import Sidebar from './receiver-add'
import ListSelect from './list-select'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserDashboard', () => {
  let userDashboard
  let classes = {
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: '10px',
    }
  }

  beforeEach(() => {
    const getCurrentListId = () => { return 1 }
    userDashboard = shallow(<UserDashboard email="cody@email.com" classes={classes} getCurrentListId={getCurrentListId}/>)
  })

  it('renders the <ReceiverAdd /> component', () => {
    expect(userDashboard.find(ReceiverAdd)).to.have.lengthOf(1)
  })

  it('renders the <ReceiversList /> component', () => {
    expect(userDashboard.find(ReceiverList)).to.have.lengthOf(1)
  })

  it('renders the <Sidebar /> component', () => {
    expect(userDashboard.find(Sidebar)).to.have.lengthOf(1)
  })

  it('renders the <ListSelect /> component', () => {
    expect(userDashboard.find(ListSelect)).to.have.lengthOf(1)
  })

})
