<div class="overflow-x-auto relative shadow-md sm:rounded-lg"
     x-data="{ products: [] }" x-init="products = await (await fetch('/data.json')).json()">
    <div class="pb-4 bg-white">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <input type="text" id="table-search"
	@input = "products = $event.target.value ? products.filter(product => product.name.toLowerCase().includes($event.target.value.toLowerCase())) : await (await fetch('/data.json')).json()"
                class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for items">
        </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="py-3 px-6">
                    #ID
                </th>
                <th scope="col" class="py-3 px-6">
                    Họ Tên
                </th>
                <th scope="col" class="py-3 px-6">
                    Số điện thoại
                </th>
                <th scope="col" class="py-3 px-6">
                    Email
                </th>
                <th scope="col" class="py-3 px-6">
                    Hành động
                </th>
            </tr>
        </thead>
        <tbody>
            <template x-for="product in products" :key="product.id">
                <tr
                    class="bg-white border-b hover:bg-gray-50">

                    <td class="p-4 w-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        x-text="product.name">
                    </th>
                    <td class="py-4 px-6" x-text="product.phone"></td>
                    <td class="py-4 px-6" x-text="product.email"></td>
                    <td class="py-4 px-6">
                        <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                    </td>
                </tr>
            </template>

        </tbody>
    </table>
</div>
