import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose, lifecycle } from 'recompose';
import { PresentForm } from '../organisms';
import { getTags } from '../../tag/actions';
import { add, presentById, edit } from '../actions';


const enhance = compose(
  connect(
    (state, props) => ({
      id: props.match.params.id,
      present: state.present.presentById,
      tags: state.tag.tags,
    }),
    dispatch => ({
      getTags: () => dispatch(getTags()),
      update: present => dispatch(edit(present)),
      getPresent: id => dispatch(presentById(id)),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.getPresent(this.props.id);
      this.props.getTags();
    },
  }),
);

const initialTouched = {
  title: true,
  content: true,
  photo: true,
  gender: true,
};

const PageWrapper = styled.div`
  padding: 0 48px;

  h3 {
    margin-bottom: 0;
  }
`;

const UpdatePresentView = ({ update, present, tags }) => present.images ? (
  <PageWrapper>
    <PresentForm
      propsSubmit={update}
      present={{
        ...present,
        images: present.images.join('\n'),
      }}
      title='Редагувати'
      touched={initialTouched}
      tags={tags}
    />
  </PageWrapper>
) : null;

UpdatePresentView.propTypes = {
  present: PropTypes.objectOf(PropTypes.string),
  update: PropTypes.func,
};

UpdatePresentView.defaultProps = {
  present: {},
  update: null,
};

export const EditPresent = enhance(UpdatePresentView)
