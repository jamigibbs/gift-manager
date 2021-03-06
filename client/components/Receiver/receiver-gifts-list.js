import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import { withStyles } from '@material-ui/core/styles'
import GiftIcon from '@material-ui/icons/Photo'
import { ReceiverGiftDelete, ReceiverGiftToggle } from '../Receiver'
import BackButton from '../back-button'
import { getAllReceiverGifts } from '../../actions'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@material-ui/core/'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    borderRadius: 0
  },
  table: {
    minWidth: 700
  },
  giftLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  notice: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 3,
  }
})

class ReceiverGiftsList extends Component {

  componentDidMount(){
    this.props.getAllReceiverGifts(this.props.receiverId)
  }

  render(){
    const { classes, receiverId, gifts } = this.props

    if (gifts.length === 0 ) {
      return (
        <div>
          <Paper className={classes.notice}>
            <Typography variant="h6">Your Gift Receiver Has No Gifts Ideas Yet!</Typography>
            <Typography variant="body1">When you find gift ideas on the internet, simply click "Add a Gift Idea" and paste the link to start keeping track</Typography>
          </Paper>
          <div className={classes.root}><BackButton text="Go Back" /></div>
        </div>
      )
    }

    return (
      <div className={classes.root}>
      <Paper>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Purchased</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell numeric>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gifts.map(gift => {
            return (
              <TableRow key={gift.id}>
                <TableCell><ReceiverGiftToggle gift={gift}/></TableCell>
                <TableCell>
                  { gift.item.image ? (
                    <img src={gift.item.image} width="50" />
                  ) : (
                    <GiftIcon style={{ fontSize: 50 }} color="disabled" />
                  )

                  }
                </TableCell>
                <TableCell component="th" scope="row">
                { gift.item.url ? (
                  <a href={gift.item.url} className={classes.giftLink} target="_blank" rel="noopener">{gift.item.name}</a>
                ) : (
                  gift.item.name
                )}
                </TableCell>
                <TableCell numeric>
                  ${gift.price}
                </TableCell>
                <TableCell numeric>
                  <ReceiverGiftDelete
                    itemId={gift.id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>

    <BackButton text="Go Back" />
    </div>
    )
  }
}

const loadingSelector = createLoadingSelector(['GET_ALL_RECEIVER_GIFTS'])

ReceiverGiftsList.propTypes = {
  gifts: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object,
  receiverId: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    gifts: state.receivers.gifts,
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReceiverGifts: (receiverId) => {
      dispatch(getAllReceiverGifts(receiverId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiverGiftsList))
