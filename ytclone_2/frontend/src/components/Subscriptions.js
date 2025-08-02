import React from 'react';

const dummySubscriptions = [
  {
    id: 1,
    name: 'CodeWithReact',
    avatar: 'https://i.pravatar.cc/100?img=1',
    description: 'React tutorials and web dev tips.',
  },
  {
    id: 2,
    name: 'Django Daily',
    avatar: 'https://i.pravatar.cc/100?img=2',
    description: 'Learn Django step by step.',
  },
  {
    id: 3,
    name: 'Design Delight',
    avatar: 'https://i.pravatar.cc/100?img=3',
    description: 'UI/UX design guides and inspiration.',
  },
];

function Subscriptions() {
  return (
    <div style={{ paddingTop: '80px', paddingLeft: '220px', paddingRight: '20px' }}>
      <h2 className="mb-4">Your Subscriptions</h2>
      <div className="row">
        {dummySubscriptions.map(channel => (
          <div className="col-md-6 col-lg-4 mb-4" key={channel.id}>
            <div className="card d-flex align-items-center text-center p-3">
              <img
                src={channel.avatar}
                alt={channel.name}
                className="rounded-circle mb-3"
                width="80"
                height="80"
              />
              <h5 className="mb-1">{channel.name}</h5>
              <p className="text-muted small">{channel.description}</p>
              <button className="btn btn-outline-danger btn-sm">Unsubscribe</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;

