import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { getAllListReceivers, updateCurrentListId, getAllGiftsForList } from '../../actions'
import { strToLowercaseDashed } from '../../utilities'
import ReceiverActions from './receiver-actions'
import ReceiverAdd from './receiver-add'
import { ListDelete } from '../List'
import { GiftCount, GiftPurchaseCount } from '../Receiver'

import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core/'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    borderRadius: 0
  },
  table: {
    minWidth: 700
  },
  receiver: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  notice: {
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 3,
  },
  deleteButton: {
    float: 'right'
  }
})

class ReceiversList extends Component {

  componentDidMount = () => {
    const { listId } = this.props.match.params
    this.props.getAllListReceivers(parseInt(listId))
    this.props.updateCurrentListId(parseInt(listId))
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.receivers !== nextProps.receivers) {
      const receiverIds = this.receiverIdsArray(nextProps.receivers)
      this.props.getAllGiftsForList(receiverIds)
    }
  }

  componentDidUpdate = (prevProps) => {
    const { listId } = this.props.match.params
    if (listId !== prevProps.match.params.listId) {
      this.props.getAllListReceivers(parseInt(listId))
      this.props.updateCurrentListId(parseInt(listId))
    }
  }

  receiverIdsArray = (receivers) => {
    if (receivers) {
      return receivers.map((receiver) => {
        return parseInt(receiver.id)
      })
    }
  }

  render(){
    const { receivers, classes, match, gifts } = this.props
    const listId = parseInt(match.params.listId)

    if (receivers.length === 0 ) {
      return (
        <div className={classes.root}>
          <Paper className={classes.notice}>
            <Typography variant="h6">Nice work creating a new list!</Typography>
            <Typography variant="body1">Next you'll want to add names to the list below for the people you're finding gifts.</Typography>
          </Paper>
          <ReceiverAdd listId={listId} />

          <div className={classes.deleteButton} >
            <ListDelete listId={listId} />
          </div>
        </div>
      )
    }

    return (
      <div className={classes.root}>

        <ReceiverAdd listId={listId} />

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow>
                  <TableCell>Receiver Name</TableCell>
                  <TableCell numeric>Assigned Gifts</TableCell>
                  <TableCell numeric>Purchased Gifts</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receivers &&
                  receivers.map((receiver) => {
                    return (
                      <TableRow key={receiver.id}>
                        <TableCell component="th" scope="row">
                          <Link
                            className={classes.receiver}
                            to={`/dashboard/list/${listId}/receiver/${strToLowercaseDashed(receiver.name)}/${receiver.id}`}>
                            <Typography variant="body1">{receiver.name}</Typography>
                          </Link>
                        </TableCell>
                        <TableCell numeric>
                          <GiftCount
                            receiverId={receiver.id}
                            gifts={gifts} />
                        </TableCell>
                        <TableCell numeric>
                          <GiftPurchaseCount
                            receiverId={receiver.id}
                            gifts={gifts} />
                        </TableCell>
                        <TableCell>
                          <ReceiverActions
                            receiverId={receiver.id}
                            listId={listId}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
          </Table>
        </Paper>
        <div className={classes.deleteButton} >
          <ListDelete listId={listId} />
        </div>
      </div>
    )
  }
}

ReceiversList.propTypes = {
  receivers: PropTypes.arrayOf(PropTypes.object),
  gifts: PropTypes.arrayOf(PropTypes.object),
  userLists: PropTypes.arrayOf(PropTypes.object),
  getAllListReceivers: PropTypes.func,
  updateCurrentListId: PropTypes.func,
  getAllGiftsForList: PropTypes.func,
  classes: PropTypes.object,
  match: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    receivers: state.receivers.allFromList,
    gifts: state.list.gifts,
    userLists: state.list.userLists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListReceivers: (listId) => {
      dispatch(getAllListReceivers(listId))
    },
    updateCurrentListId: (listId) => {
      dispatch(updateCurrentListId(listId))
    },
    getAllGiftsForList: (receiverIds) => {
      dispatch(getAllGiftsForList(receiverIds))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiversList))
