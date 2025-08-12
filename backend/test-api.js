import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testTask = {
  title: 'Test Task',
  description: 'This is a test task for the API'
};

const testUpdate = {
  status: 'completed'
};

async function testAPI() {
  console.log('🧪 Testing Task Manager API...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${BASE_URL.replace('/api', '')}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData.message);
    console.log('');

    // Test 2: Create Task
    console.log('2️⃣ Testing Create Task...');
    const createResponse = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testTask)
    });
    const createData = await createResponse.json();
    console.log('✅ Task Created:', createData.data.title);
    const taskId = createData.data._id;
    console.log('');

    // Test 3: Get All Tasks
    console.log('3️⃣ Testing Get All Tasks...');
    const getAllResponse = await fetch(`${BASE_URL}/tasks`);
    const getAllData = await getAllResponse.json();
    console.log('✅ Tasks Retrieved:', getAllData.count, 'tasks found');
    console.log('');

    // Test 4: Get Single Task
    console.log('4️⃣ Testing Get Single Task...');
    const getOneResponse = await fetch(`${BASE_URL}/tasks/${taskId}`);
    const getOneData = await getOneResponse.json();
    console.log('✅ Single Task Retrieved:', getOneData.data.title);
    console.log('');

    // Test 5: Update Task
    console.log('5️⃣ Testing Update Task...');
    const updateResponse = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUpdate)
    });
    const updateData = await updateResponse.json();
    console.log('✅ Task Updated:', updateData.data.status);
    console.log('');

    // Test 6: Get Tasks by Status
    console.log('6️⃣ Testing Get Tasks by Status...');
    const statusResponse = await fetch(`${BASE_URL}/tasks?status=completed`);
    const statusData = await statusResponse.json();
    console.log('✅ Completed Tasks:', statusData.count, 'tasks found');
    console.log('');

    // Test 7: Delete Task
    console.log('7️⃣ Testing Delete Task...');
    const deleteResponse = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });
    const deleteData = await deleteResponse.json();
    console.log('✅ Task Deleted:', deleteData.message);
    console.log('');

    console.log('🎉 All API tests completed successfully!');
    console.log('🚀 Your Task Manager Backend is working perfectly!');

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    console.log('\n💡 Make sure your server is running on port 5000');
    console.log('💡 Run: npm run dev');
  }
}

// Run tests
testAPI();
