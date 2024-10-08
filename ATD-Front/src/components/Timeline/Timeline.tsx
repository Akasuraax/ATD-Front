'use client';

import { Timeline } from 'flowbite-react';
import moment from 'moment';
import PropTypes from 'prop-types';

const TimelineComponent = ({ activities }) => {
    return (
        <Timeline>
            {activities.map((a) => (
                <Timeline.Item key={a.id}>
                    <Timeline.Content>
                        <Timeline.Time>{moment(a.start_date).format('DD/MM/YYYY HH:mm')}</Timeline.Time>
                        <Timeline.Title>{a.title}</Timeline.Title>
                        <Timeline.Body>{a.description}</Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>
            ))}
        </Timeline>
    );
};

TimelineComponent.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            start_date: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default TimelineComponent;
