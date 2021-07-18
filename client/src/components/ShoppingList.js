import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    
    // Life cycle method
    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
    
    render() {
        /*Destructuring*/;
        const {items} = this.props.item12;
        console.log(this.props.item12);

        return (
            <Container>                
                <ListGroup>
                    <TransitionGroup className = "shopping-list">
                         {items.map(({ _id, name }) => (
                             <CSSTransition key={_id} timeout={500} classNames="fade">
                                 <ListGroupItem>
                                     <Button
                                        className='remove-btn'
                                        color='danger'
                                        size='sm'
                                        onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button>

                                     {name}
                                 </ListGroupItem>
                             </CSSTransition>
                         ))}
                    </TransitionGroup>
                </ListGroup>

                

            </Container>
        );  
    };
    
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item12: PropTypes.object.isRequired
}

// This function turns the state 
// into component property.
const mapStateToProps = (state) => ({
    // state.itesm is from reducers/index.js 
    item12: state.itesm
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);