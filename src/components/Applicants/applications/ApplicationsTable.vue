<template>
    <div class="table-responsive mt-3">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Role</th>
            <th>Date Applied</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(app, index) in applications" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ app.company }}</td>
            <td>{{ app.role }}</td>
            <td>{{ app.date }}</td>
            <td>
              <span class="badge"
                :class="{
                  'bg-warning text-dark': app.status === 'In Review',
                  'bg-success': app.status === 'Shortlisted',
                  'bg-primary': app.status === 'Offered',
                  'bg-info text-dark': app.status === 'Interviewing',
                  'bg-danger': app.status === 'Unsuitable'
                }">
                {{ app.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ApplicationsTable',
    props: { applications: Array }
  };
  </script>
  