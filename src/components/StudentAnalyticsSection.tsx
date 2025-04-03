'use client';

export default function StudentAnalyticsSection() {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full table-auto border text-sm rounded-lg shadow-sm bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Quiz</th>
            <th className="px-4 py-2 border">Check-in</th>
            <th className="px-4 py-2 border">Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">Samantha</td>
            <td className="px-4 py-2 border">Completed</td>
            <td className="px-4 py-2 border">✅</td>
            <td className="px-4 py-2 border text-gray-500 italic">
              "I loved today’s challenge!"
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Liam</td>
            <td className="px-4 py-2 border">Incomplete</td>
            <td className="px-4 py-2 border">❌</td>
            <td className="px-4 py-2 border text-gray-500 italic">
              "Didn’t understand the volcano part."
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
