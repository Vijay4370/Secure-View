import { useState } from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  Video, 
  Bell, 
  Settings, 
  LogOut,
  Plus,
  Power,
  Pencil,
  Trash2,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { cameras as initialCameras, alerts as initialAlerts } from '../data/mockData';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('cameras');
  const [cameras, setCameras] = useState(initialCameras);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [showAddCamera, setShowAddCamera] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCamera, setEditingCamera] = useState(null);

  const [newCamera, setNewCamera] = useState({
    name: '',
    location: '',
    model: '',
    resolution: '1080p',
  });

  const sidebarItems = [
    { id: 'cameras', label: 'Camera Management', icon: <Camera className="w-5 h-5" /> },
    { id: 'liveview', label: 'Live Monitoring', icon: <Video className="w-5 h-5" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleAddCamera = () => {
    if (newCamera.name && newCamera.location) {
      const camera = {
        id: cameras.length + 1,
        ...newCamera,
        status: 'online',
        isRecording: false,
        lastMotion: 'Just now',
        ipAddress: `192.168.1.${100 + cameras.length}`,
      };
      setCameras([...cameras, camera]);
      setNewCamera({ name: '', location: '', model: '', resolution: '1080p' });
      setShowAddCamera(false);
    }
  };

  const handleDeleteCamera = (id) => {
    setCameras(cameras.filter((c) => c.id !== id));
  };

  const handleToggleRecording = (id) => {
    setCameras(cameras.map((c) => 
      c.id === id ? { ...c, isRecording: !c.isRecording } : c
    ));
  };

  const handleToggleStatus = (id) => {
    setCameras(cameras.map((c) => 
      c.id === id ? { ...c, status: c.status === 'online' ? 'offline' : 'online' } : c
    ));
  };

  const filteredCameras = cameras.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadAlerts = alerts.filter((a) => !a.read).length;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-danger" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-danger';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary border-r border-border hidden md:block">
        <div className="p-6">
          <h2 className="font-orbitron text-xl font-bold text-text-primary mb-6">
            Dashboard
          </h2>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-primary'
                }`}
              >
                {item.icon}
                <span className="font-inter text-sm">{item.label}</span>
                {item.id === 'alerts' && unreadAlerts > 0 && (
                  <span className="ml-auto w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
                    {unreadAlerts}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-danger transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-inter text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-inter">Total Cameras</p>
                <p className="font-orbitron text-2xl font-bold text-text-primary">{cameras.length}</p>
              </div>
              <Camera className="w-8 h-8 text-accent" />
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-inter">Online</p>
                <p className="font-orbitron text-2xl font-bold text-success">
                  {cameras.filter((c) => c.status === 'online').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-inter">Recording</p>
                <p className="font-orbitron text-2xl font-bold text-danger">
                  {cameras.filter((c) => c.isRecording).length}
                </p>
              </div>
              <Video className="w-8 h-8 text-danger" />
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-inter">Alerts</p>
                <p className="font-orbitron text-2xl font-bold text-accent">{unreadAlerts}</p>
              </div>
              <Bell className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>

        {/* Cameras Tab */}
        {activeTab === 'cameras' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orbitron text-2xl font-bold text-text-primary">Camera Management</h3>
              <button
                onClick={() => setShowAddCamera(true)}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-background font-inter rounded-lg hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Camera
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search cameras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary border border-border rounded-xl text-text-primary placeholder-text-secondary font-inter focus:outline-none focus:border-accent"
              />
            </div>

            {/* Camera List */}
            <div className="space-y-4">
              {filteredCameras.map((camera) => (
                <div
                  key={camera.id}
                  className="glass rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4"
                >
                  {/* Camera Preview */}
                  <div className="w-32 h-20 bg-primary rounded-lg overflow-hidden relative">
                    <div className="camera-feed w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-text-secondary" />
                      {camera.isRecording && (
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <span className="w-2 h-2 bg-danger rounded-full recording-pulse"></span>
                          <span className="text-danger text-xs font-inter">REC</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Camera Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-orbitron text-lg font-semibold text-text-primary">
                        {camera.name}
                      </h4>
                      {getStatusIcon(camera.status)}
                    </div>
                    <p className="text-text-secondary text-sm font-inter">{camera.location}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-text-secondary text-xs font-inter">{camera.model}</span>
                      <span className="text-text-secondary text-xs font-inter">{camera.resolution}</span>
                      <span className="text-text-secondary text-xs font-inter">IP: {camera.ipAddress}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRecording(camera.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        camera.isRecording
                          ? 'bg-danger/20 text-danger'
                          : 'bg-primary text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Video className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(camera.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        camera.status === 'online'
                          ? 'bg-success/20 text-success'
                          : 'bg-primary text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Power className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingCamera(camera)}
                      className="p-2 bg-primary text-text-secondary rounded-lg hover:text-accent transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCamera(camera.id)}
                      className="p-2 bg-primary text-text-secondary rounded-lg hover:text-danger transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div>
            <h3 className="font-orbitron text-2xl font-bold text-text-primary mb-6">Alerts & Notifications</h3>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`glass rounded-xl p-4 flex items-start gap-4 ${
                    !alert.read ? 'border-l-4 border-accent' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'motion' ? 'bg-accent/20' : 
                    alert.type === 'offline' ? 'bg-danger/20' : 'bg-success/20'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${getSeverityColor(alert.severity)}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-inter font-semibold text-text-primary">{alert.camera}</h4>
                      {!alert.read && (
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm font-inter">{alert.message}</p>
                    <p className="text-text-secondary text-xs font-inter mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h3 className="font-orbitron text-2xl font-bold text-text-primary mb-6">Settings</h3>
            <div className="glass rounded-xl p-6 max-w-xl">
              <div className="space-y-6">
                <div>
                  <label className="font-inter text-text-primary block mb-2">System Name</label>
                  <input
                    type="text"
                    defaultValue="SecureView System"
                    className="w-full px-4 py-2 bg-primary border border-border rounded-lg text-text-primary font-inter focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-inter text-text-primary block mb-2">Email Notifications</label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-accent" />
                    <span className="text-text-secondary font-inter text-sm">Enable email alerts</span>
                  </div>
                </div>
                <div>
                  <label className="font-inter text-text-primary block mb-2">Recording Quality</label>
                  <select className="w-full px-4 py-2 bg-primary border border-border rounded-lg text-text-primary font-inter focus:outline-none focus:border-accent">
                    <option>4K Ultra HD</option>
                    <option>1080p Full HD</option>
                    <option>720p HD</option>
                  </select>
                </div>
                <button className="px-6 py-2 bg-accent text-background font-inter rounded-lg hover:bg-amber-400 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live View Tab */}
        {activeTab === 'liveview' && (
          <div>
            <h3 className="font-orbitron text-2xl font-bold text-text-primary mb-6">Live Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cameras.filter((c) => c.status === 'online').map((camera) => (
                <div key={camera.id} className="glass rounded-xl overflow-hidden">
                  <div className="relative h-40 bg-primary">
                    <div className="camera-feed w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-text-secondary" />
                      <div className="scan-line"></div>
                    </div>
                    {camera.isRecording && (
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="w-2 h-2 bg-danger rounded-full recording-pulse"></span>
                        <span className="text-danger text-xs font-inter">REC</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs font-inter rounded">
                        {camera.name}
                      </span>
                      <span className="px-2 py-1 bg-black/50 text-success text-xs font-inter rounded">
                        {camera.resolution}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add Camera Modal */}
      {showAddCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAddCamera(false)}
          ></div>
          <div className="relative bg-secondary border border-border rounded-2xl max-w-md w-full p-6">
            <h3 className="font-orbitron text-xl font-bold text-text-primary mb-4">Add New Camera</h3>
            <div className="space-y-4">
              <div>
                <label className="text-text-secondary text-sm font-inter block mb-1">Camera Name</label>
                <input
                  type="text"
                  value={newCamera.name}
                  onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                  className="w-full px-4 py-2 bg-primary border border-border rounded-lg text-text-primary font-inter focus:outline-none focus:border-accent"
                  placeholder="e.g., Front Entrance"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-inter block mb-1">Location</label>
                <input
                  type="text"
                  value={newCamera.location}
                  onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                  className="w-full px-4 py-2 bg-primary border border-border rounded-lg text-text-primary font-inter focus:outline-none focus:border-accent"
                  placeholder="e.g., Building Front"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-inter block mb-1">Model</label>
                <input
                  type="text"
                  value={newCamera.model}
                  onChange={(e) => setNewCamera({ ...newCamera, model: e.target.value })}
                  className="w-full px-4 py-2 bg-primary border border-border rounded-lg text-text-primary font-inter focus:outline-none focus:border-accent"
                  placeholder="e.g., Dome-4K-Pro"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-inter block mb-1">Resolution</label>
                <select
                  value={newCamera.resolution}
                  onChange={(e) => setNewCamera({ ...newCamera, resolution: e.target.value })}
                  className="w-full px-4 py-2 bg-primary border border-border rounded-lg text-text-primary font-inter focus:outline-none focus:border-accent"
                >
                  <option>4K Ultra HD</option>
                  <option>5MP</option>
                  <option>1080p</option>
                  <option>720p</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddCamera(false)}
                className="flex-1 py-2 border border-border text-text-secondary font-inter rounded-lg hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCamera}
                className="flex-1 py-2 bg-accent text-background font-inter rounded-lg hover:bg-amber-400 transition-colors"
              >
                Add Camera
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
